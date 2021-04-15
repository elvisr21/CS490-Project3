import './topbar.css';

export const Topbar=(logged)=>{
    return (
        <div style="background-color: #b3937f">
            {logged ? (
                <p class="navig">
                    <welcome>Welcome, { name }</welcome>
                    <option href="profile">View Profile</option>
                </p>
            ):(
                <p class="navig">
                    <option href="login">Login</option>
                </p>
            )}
            <h2 id="logo" style="color: white"><i>Chef Masters</i></h2>
        </div>
    );
};