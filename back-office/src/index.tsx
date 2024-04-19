import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Connection, Home, Language, Location, Message, Service, Ticket, User, Accept, Scraper} from './app/providers';
import './sass/index.scss';
import Occupation from "./app/providers/occupation";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Connection/>}></Route>
                    <Route path={"/language"} element={<Language/>}></Route>
                    <Route path={"/location"} element={<Location/>}></Route>
                    <Route path={"/message"} element={<Message/>}></Route>
                    <Route path={"/provider"} element={<Service/>}></Route>
                    <Route path={"/ticket"} element={<Ticket/>}></Route>
                    <Route path={"/user"} element={<User/>}></Route>
                    <Route path={"/accept"} element={<Accept/>}></Route>
                    <Route path={'scraper'} element={<Scraper/>}></Route>
                    <Route path={"/location-occupation"} element={<Occupation/>}></Route>
                    <Route path={"*"} element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
