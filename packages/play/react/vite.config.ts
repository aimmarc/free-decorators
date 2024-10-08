import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Swc from 'unplugin-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: (id) => {
				if (id.includes('.tsx'))
					// 针对jsx需要babel单独处理
					return {
						plugins: [
							[
								'@babel/plugin-proposal-decorators',

								{
									legacy: true,
								},
							],
							[
								'@babel/plugin-transform-class-properties',
								{
									loose: true,
								},
							],
						],
					};
				else return {};
			},
		}),
		Swc.vite({
			module: {
				type: 'nodenext',
			},
			jsc: {
				parser: {
					syntax: 'typescript',
					tsx: true,
					decorators: true,
					dynamicImport: true,
				},
				transform: {
					react: {
						runtime: 'automatic',
					},
					decoratorMetadata: true,
					useDefineForClassFields: false,
					legacyDecorator: true,
				},
				loose: true, // 开启这个属性保证属性装饰器正常使用
				target: 'esnext',
			},
		}),
	],
});
