import { Module } from '@aimmarc/http-module/index';
import AppController from './app.controller';

@Module({
	controllers: [AppController],
})
export default class AppModule {
	constructor(readonly appController: AppController) {}

	test() {
		console.log('appController', this.appController);
	}
}
