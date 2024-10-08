import { MetadataKey } from '../enum';

/**
 * React Component装饰器
 * @param options
 * @returns
 */
export function Component(options: object | any = {}): any {
	if (typeof options === 'function') {
		return Component()(options);
	}
	return function (target: any) {
		Reflect.defineMetadata(
			MetadataKey.REACT_COMPONENT,
			options || {},
			target
		);
		return class extends target {
			constructor(props = {}) {
				super(props);
				const injectModuleKeys = Reflect.getMetadata(
					MetadataKey.INJECT_MODULE,
					target
				);
				if (
					Array.isArray(injectModuleKeys) &&
					injectModuleKeys.length > 0
				) {
					injectModuleKeys.forEach((key) => {
						delete this[key]; // 删掉注入的模块，使用原型链上的属性
					});
				}
			}
		};
	};
}
