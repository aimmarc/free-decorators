import { Module } from '@aimmarc/http-module/index';
import { UserService } from './user.service';

@Module({
	providers: [UserService],
	exports: [],
})
export default class UserModule {
	constructor(readonly userService: UserService) {}
}
