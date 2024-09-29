import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Swc from 'unplugin-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
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
				},
				loose: true, // 开启这个属性保证属性装饰器正常使用
			},
		}),
	],
});
