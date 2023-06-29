import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './styles/AppBack.scss';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="AppBack">
			<div className="logos">
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h2>Vite + React from Back</h2>
			<div className="card">
				<button onClick={() => setCount(count => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</div>
	);
}

export default App;