import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContextProvider from './context/AppContext';
import './index.scss';
import App from './pages/3D_modeler/App';
import PageNotFound from './pages/404_not_found/PageNotFound';

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
