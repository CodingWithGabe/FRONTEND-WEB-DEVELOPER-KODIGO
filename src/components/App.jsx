import React from "react";
import { Router, BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from './Home'
import NotFound from "./NotFound";
import Menu from "./Menu";
import CellphonesCRUD from "./CellphonesCRUD";
import VideogamesCRUD from "./VideogamesCRUD";
import CellphonesFORM from "./CellphonesFORM";
import VideogamesFORM from "./VideogamesFORM";

function App(){
    return (
        <div>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cellphones" element={<CellphonesCRUD />} />
                    <Route path="/cellphones/new" element={<CellphonesFORM />} />
                    <Route path="/cellphones/edit/:id" element={<CellphonesFORM />} />
                    <Route path="/cellphones/delete/:id" element={<CellphonesFORM del={true} />} />
                    <Route path="/videogames" element={<VideogamesCRUD />} />
                    <Route path="/videogames/new" element={<VideogamesFORM />} />
                    <Route path="/videogames/edit/:id" element={<VideogamesFORM />} />
                    <Route path="/videogames/delete/:id" element={<VideogamesFORM del={true} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App