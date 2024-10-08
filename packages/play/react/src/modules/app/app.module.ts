import { Module } from '@aimmarc/http-module/index';
import AppController from './app.controller';
import AppService from './app.service';
import { UserService } from '../user/user.service';

@Module({
	controllers: [AppController],
	providers: [AppService, UserService],
})
export default class AppModule {
	constructor(
		readonly appController: AppController,
		readonly userService: UserService
	) {}

	test() {}
}
