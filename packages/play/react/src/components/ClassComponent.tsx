import React from 'react';
import { Component, InjectModule } from '@aimmarc/http-module/index';
import AppModule from '../modules/app/app.module';

@Component
class ClassComponent extends React.Component<{ name: string }> {
	@InjectModule(AppModule)
	appModule!: AppModule;

	async componentDidMount() {
		console.log(this);
		await this.appModule.appController.getAppInfo();
	}

	render() {
		return (
			<>
				<div>ClassComponent {this.props.name}</div>
			</>
		);
	}
}

export default ClassComponent;
