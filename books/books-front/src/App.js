import './App.css';
import React from "react";
import Home from './Home';
//import Search from './Search';
import Book from "./Book";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home/>}/>
              {/*<Route path="/search" element={<Search/>}/>*/}
              <Route path="/book/:id" element={<Book/>}/>
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
