import {
	Injectable,
	type RequestConfigureType,
} from '@aimmarc/http-module/index';
import HttpResponse from '@aimmarc/http-module/src/http/httpRequest';

@Injectable()
export default class AppService {
	constructor(private readonly httpRequest: HttpResponse) {}

	getAppConfig(reqCfg: RequestConfigureType<object>): Promise<object> {
		return this.httpRequest.request(<RequestConfigureType<object>>reqCfg);
	}
}
