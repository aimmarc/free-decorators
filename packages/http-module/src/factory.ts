import { AxiosRequestConfig } from 'axios';
import Container, { DepsMap } from './container';
import { MetadataKey, ModuleMetadata } from './enum';
import {
	Constructor,
	GlobalConfig,
	MessageType,
	InterceptorsType,
} from './interfaces';
import { isFunction } from './utils';
import { v4 as uuidv4 } from 'uuid';

export type HttpServicesApplication<T = any> = ModuleFactory & T;
export const FactoryMap = new Map<string, ModuleFactory | any>();
export const globalConfig: GlobalConfig = {
	globalPrefix: '',
	showMessage: undefined,
	interceptors: undefined,
	requestConfig: undefined,
};

/**
 * 获取全局modules
 * @param constructor
 * @returns
 */
function getGlobalProviders(constructor: Constructor<any>) {
	const isGlobalModule = !!Reflect.getMetadata(
		MetadataKey.GLOBAL,
		constructor
	);
	const ret = [
		...(Reflect.getMetadata(ModuleMetadata.CONTROLLERS, constructor) ?? []),
		...(Reflect.getMetadata(ModuleMetadata.PROVIDERS, constructor) ?? []),
	];
	return isGlobalModule ? ret : [];
}

/**
 *
 * @param modules
 * @returns
 */
function deepRegisterModulesAllProvider(
	modules: Array<Constructor<any>>
): Array<Constructor<any>> {
	return modules.reduce((prev: Array<Constructor<any>>, constructor) => {
		const currentImportModules: Array<Constructor<any>> =
			Reflect.getMetadata(ModuleMetadata.IMPORTS, constructor) ?? [];
		const exports =
			Reflect.getMetadata(ModuleMetadata.EXPORTS, constructor) ?? [];
		const globalProviders = getGlobalProviders(constructor);
		const providers = deepRegisterModulesAllProvider(
			currentImportModules.filter((constructor) =>
				Reflect.getMetadata(MetadataKey.GLOBAL, constructor)
			)
		); // 如果IMPORTS的模块中存在全局模块，还需要进行递归处理
		return [...prev, ...exports, ...providers, ...globalProviders];
	}, []);
}

/**
 * 获取所有模块和依赖
 * @param target
 * @returns
 */
function getAllModuleAndProviders<T = any>(target: Constructor<T>) {
	const modules = [
		...new Set([
			...(Reflect.getMetadata(ModuleMetadata.IMPORTS, target) ?? []),
		]),
	];
	const constructorProviders = [
		...new Set([
			...(Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, target) ??
				[]),
		]),
	];
	const providers = [
		...new Set([
			...(Reflect.getMetadata(ModuleMetadata.PROVIDERS, target) ?? []),
		]),
		...new Set([
			...(Reflect.getMetadata(ModuleMetadata.CONTROLLERS, target) ?? []),
		]),
	];
	const deepAllProviders = deepRegisterModulesAllProvider(modules);
	return {
		constructorProviders,
		deepAllProviders,
		providers,
	};
}

function initContainer(
	container: Container,
	providers: Array<Constructor<any>>
) {
	providers.forEach((provide) => {
		container.addProvider(provide);
	});
}

/**
 * 获取唯一依赖
 * @param target
 * @param params
 * @returns
 */
function getSingleProvide(target: any, params: any[]) {
	if (DepsMap.has(target)) return DepsMap.get(target);
	const provide = new target(...params);
	DepsMap.set(target, provide);
	return provide;
}

/**
 * 模块工厂
 */
export class ModuleFactory {
	token = '';
	globalPrefix: string | undefined = globalConfig.globalPrefix;
	showMessage: MessageType | undefined = globalConfig.showMessage;
	interceptors: InterceptorsType | undefined = globalConfig.interceptors;
	requestConfig!: AxiosRequestConfig;

	/**
	 * 全局配置
	 * @param cfg
	 */
	static configure(cfg: GlobalConfig = {}) {
		globalConfig.globalPrefix = cfg['globalPrefix'] || '';
		globalConfig.showMessage = cfg['showMessage'];
		globalConfig.interceptors = cfg['interceptors'];
		globalConfig.requestConfig = cfg['requestConfig'];
	}

	static create<T>(target: Constructor<T>): HttpServicesApplication<T> {
		if (DepsMap.has(target)) {
			return DepsMap.get(target);
		}
		const module = new this().factory(target);
		DepsMap.set(target, module);
		return module;
	}

	/**
	 * 模块工厂函数
	 * @param target
	 * @param options
	 * @returns
	 */
	private factory<T>(
		target: Constructor<T> /** options?: any */
	): HttpServicesApplication<T> {
		this.token = uuidv4();
		FactoryMap.set(this.token, this);
		const container = new Container();
		const { constructorProviders, deepAllProviders, providers } =
			getAllModuleAndProviders(target);
		const addProviders = [...new Set([...deepAllProviders, ...providers])];
		initContainer(container, addProviders); // 将收集到的依赖全部去重再保存到container中备用
		addProviders.forEach((target) => {
			Reflect.defineMetadata(MetadataKey.TOKEN, this.token, target);
		});
		const params: Array<Constructor<any>> =
			constructorProviders?.map((currentTarget) => {
				if (
					!Reflect.getMetadata(
						MetadataKey.INJECTABLE_WATERMARK,
						currentTarget
					)
				) {
					throw new Error(`${currentTarget.name} is not injected`);
				}
				if (
					!container.inject(currentTarget) &&
					Reflect.getMetadata(
						MetadataKey.INJECTABLE_WATERMARK,
						currentTarget
					)
				) {
					throw new Error(
						`Please use exports Service ${currentTarget.name}`
					);
				}
				const currentProviders = Reflect.getMetadata(
					MetadataKey.PARAMTYPES_METADATA,
					currentTarget
				);
				return getSingleProvide(currentTarget, [
					...registerDeepClass(currentProviders || []),
				]);
				// return new currentTarget(
				// 	...registerDeepClass(currentProviders || [])
				// );
			}) || [];
		const instance = new target(...params);
		const obj = {
			setGlobalPrefix: this.setGlobalPrefix.bind(this),
			setMessage: this.setMessage.bind(this),
			setInterceptors: this.setInterceptors.bind(this),
		};
		return Object.assign(
			instance as any,
			obj,
			this
		) as HttpServicesApplication<T>;
	}

	setGlobalPrefix(prefix = '') {
		this.globalPrefix = prefix;
	}

	setMessage(showMessage: MessageType) {
		this.showMessage = showMessage;
	}

	setInterceptors(interceptors: InterceptorsType) {
		this.interceptors = interceptors;
	}
}

/**
 * 递归注册依赖
 * @param providers
 * @returns
 */
function registerDeepClass(
	providers: Array<Constructor<any>>
): Constructor<any>[] {
	return (
		providers.map((provider: Constructor<any>) => {
			const childrenProviders = Reflect.getMetadata(
				MetadataKey.PARAMTYPES_METADATA,
				provider
			);
			const isFactoryProvide = isFunction(provider);
			let instance;
			if (!childrenProviders) {
				instance = isFactoryProvide
					? getSingleProvide(provider, []) /**new provider()*/
					: provider;
			} else {
				instance = getSingleProvide(provider, [
					...registerDeepClass(childrenProviders),
				]);
				// instance = new provider(
				// 	...registerDeepClass(childrenProviders)
				// );
			}
			return instance;
		}) || []
	);
}
