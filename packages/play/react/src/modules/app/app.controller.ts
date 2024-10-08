import {
	Controller,
	GetMapping,
	Injectable,
	Sleep,
} from '@aimmarc/http-module/index';
import AppService from './app.service';

@Injectable()
@Controller('/base/api')
export default class AppController {
	constructor(readonly appService: AppService) {}

	@Sleep(1000)
	@GetMapping('/appInfo')
	getAppInfo(reqCfg: object = {}) {
		return this.appService.getAppConfig(reqCfg);
	}
}
