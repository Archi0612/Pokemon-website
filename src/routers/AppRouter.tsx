import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCards from "../pages/PokemonCards";
import PokemonDetails from "../pages/PokemonDetails";

const AppRouter: React.FC = () => {
    return(
        <BrowserRouter>
            
                <Routes>
                        <Route path="/" element={<PokemonCards/>} />
                        <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
                </Routes>
           
        </BrowserRouter>
    )
}
export default AppRouter;