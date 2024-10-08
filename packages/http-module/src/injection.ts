import { MetadataKey } from './enum';
import { ModuleFactory } from './factory';
import { Constructor } from './interfaces';

/**
 * @module Injectable
 * @description 标注依赖注入
 * @returns { ClassDecorator } ClassDecorator
 */
export const Injectable = (): ClassDecorator => {
	return (target: object) => {
		Reflect.defineMetadata(MetadataKey.INJECTABLE_WATERMARK, true, target);
	};
};

// export const Injection = () => {
//     return function (target: any, propertyName: string) {
//         console.log(target, propertyName);
//     };
// };
/**
 * Module注入
 * @param Module
 * @returns
 */
export const InjectModule = (Module: Constructor) => {
	const module = ModuleFactory.create(Module);
	return function (target: any, propertyName: string) {
		Object.defineProperty(target, propertyName, {
			get() {
				return module;
			},
			enumerable: true,
			configurable: true,
		});
		const injectModuleKeys =
			Reflect.getMetadata(
				MetadataKey.INJECT_MODULE,
				target.constructor
			) || [];
		injectModuleKeys.push(propertyName);
		Reflect.defineMetadata(
			MetadataKey.INJECT_MODULE,
			injectModuleKeys,
			target.constructor
		);
	};
};
