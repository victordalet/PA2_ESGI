import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Connection, Home, Location, Premium, Resa, Reserve, Service, Settings, Sign} from './app/providers';
import './sass/index.scss';
import {isBot} from "./security/isBot";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

isBot();

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
                    <Route path={"/sign-in"} element={<Sign/>}></Route>
                    <Route path={"/reserve"} element={<Reserve/>}></Route>
                    <Route path={"*"} element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
