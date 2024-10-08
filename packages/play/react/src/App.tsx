import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AppModule from './modules/app/app.module';
import { ModuleFactory } from '@aimmarc/http-module/index';
import ClassComponent from './components/ClassComponent';
import ClassComponent2 from './components/ClassComponent2';

const appModule = ModuleFactory.create(AppModule); // 通过ModuleFactory.create创建appModule

function App() {
	const [count, setCount] = useState(0);
	appModule.test();

	useEffect(() => {
		appModule.appController.getAppInfo();
	}, []);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<ClassComponent name="12" />
			<ClassComponent2 name="12" />
		</>
	);
}

export default App;
