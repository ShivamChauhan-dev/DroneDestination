import React from 'react';
import "../Main/ClientNav.css";

function ClientNav() {
    return (
        <div>
            <h1>Client Access</h1>
            <nav className="ClientNav">
                <ul className="ClientNav-List">
                    <li>
                        <h5>Project progress Monitoring</h5>
                        <ul className="ClientNavDropdown">
                            <li><a href="/Pilot selected project">Select project</a></li>
                        </ul>
                    </li>
                    <li><h5>SOP for progress monitoring</h5>
                        <ul className="ClientNavDropdown">
                            <li><a href="/">Add Inventory</a></li>
                            <li><a href="/">Manage  Inventory</a></li>
                        </ul></li>
                </ul>
            </nav>
        </div>
    );
}

export default ClientNav;