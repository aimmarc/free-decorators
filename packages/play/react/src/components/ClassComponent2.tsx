import React from 'react';
import { Component, InjectModule } from '@aimmarc/http-module/index';
import UserModule from '../modules/user/user.module';
import AppModule from '../modules/app/app.module';

@Component
class ClassComponent2 extends React.Component<{ name: string }> {
	@InjectModule(UserModule)
	userModule!: UserModule;
	@InjectModule(AppModule)
	appModule!: AppModule;

	async componentDidMount() {
		this.userModule.userService.test();
		console.log(this);
	}

	render() {
		return (
			<>
				<div>ClassComponent {this.props.name}</div>
			</>
		);
	}
}

export default ClassComponent2;
