import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Connection, Home, Location, Premium, Resa, Service, Settings} from './app/providers';
import './sass/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Connection/>}></Route>
                    <Route path={"/premium"} element={<Premium/>}></Route>
                    <Route path={"/service"} element={<Service/>}></Route>
                    <Route path={"/location"} element={<Location/>}></Route>
                    <Route path={"/resa"} element={<Resa/>}></Route>
                    <Route path={"/settings"} element={<Settings/>}></Route>
                    <Route path={"*"} element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
