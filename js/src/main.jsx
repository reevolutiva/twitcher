import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppBack from './AppBack';
import TwitcherCard from './componentes/TwitcherCard';
import './styles/main.scss';
import { TwitcherError } from './twcherErrors';
import EmbedList from './componentes/twchr-card/EmbedList';



if(document.getElementById('my-front')){
	ReactDOM.createRoot(document.getElementById('my-front')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
}

if(document.querySelector(".twchr-modal-selection-streaming-list")){
	ReactDOM.createRoot(document.querySelector(".twchr-modal-selection-streaming-list")).render(
	<React.StrictMode>
		<EmbedList />
	</React.StrictMode>,
);
}

if(document.getElementById('twchr_streams')){
	
	const root = document.getElementById('twchr_streams');
	const root_tw = document.createElement("DIV");
	[...root.querySelectorAll("table input")].forEach(e => e.setAttribute("disabled",true));
	const twchr_data = [...root.querySelectorAll("table input")].map(e => { return {name:e.name,value:e.value}});
	root_tw.classList.add("twchr_streams__root");
	root.appendChild(root_tw);

	ReactDOM.createRoot(document.querySelector("#twchr_streams .twchr_streams__root")).render(
	<React.StrictMode>
		<TwitcherCard twchr_data={twchr_data} />
	</React.StrictMode>
	);
}

