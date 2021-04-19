import './topbar.css';
import React, { useState } from 'react';

export const Topbar=()=>{
    const [logged, setLogged] = useState(false);
    const [name, setName] = useState("matt");
    return (
        <div style={{"background-color": "#b3937f"}}>
            {logged ? (
                <p class="navig">
                    <a href="/">Home</a>
                    <welcome>Welcome,</welcome>
                    <a href="/profile">View Profile</a>
                    <a href="/newrecipe">New Recipe</a>
                </p>
            ):(
                <p class="navig">
                    <a href="/">Home</a>
                    <a href="/signRegister">Login</a>
                </p>
            )}
            <h2 id="logo"><i>Chef Masters</i></h2>
        </div>
    );
};