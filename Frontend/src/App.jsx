import React from "react";
import "./styles/index.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginSignupForm } from "./pages/LoginSignupForm";
import { Notes } from "./pages/Notes";

const App = () => {
    return <>
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignupForm/>}></Route>
                <Route path="/main" element={<Notes/>}></Route>
            </Routes>
        </Router>
    </>
};

export default App;
