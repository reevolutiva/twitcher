import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppBack from './AppBack';

if(document.getElementById('my-front')){
	ReactDOM.createRoot(document.getElementById('my-front')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
}

if(document.getElementById('my-back')){
	ReactDOM.createRoot(document.getElementById('my-back')).render(
	<React.StrictMode>
		<AppBack />
	</React.StrictMode>
	);
}

