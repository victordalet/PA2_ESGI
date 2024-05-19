import ReactDOM from 'react-dom/client';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {
    Connection,
    Home,
    Language,
    Location,
    Message,
    Service,
    Ticket,
    User,
    Accept,
    Scraper,
    Provider as ProviderPage,
    Element,
    Occupation,
    Inventory
} from './app/providers';
import './sass/index.scss';
import {Provider} from "mobx-react";

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
                    <Route path={"/provider-request"} element={<ProviderPage/>}></Route>
                    <Route path={"/elements"} element={<Element/>}></Route>
                    <Route path={"/inventory"} element={<Inventory/>}></Route>
                    <Route path={"*"} element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
