import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Connection, Home} from './app/providers';
import Models from './app/models';

const models = new Models();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider {...models.getStores()}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Connection/>}></Route>
                    <Route path={"*"} element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
