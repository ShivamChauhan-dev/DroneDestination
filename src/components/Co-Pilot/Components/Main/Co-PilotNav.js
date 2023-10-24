import React from 'react';
import "./Co-PilotNav.css";

function CoPilotNav() {
    return (
        <div>
            <h1>Co-Pilot Access</h1>
            <nav className="CoPilotNav">
                <ul className="CoPilotNav-List">
                    <li>
                        <h5>Co-Pilot1</h5>
                        <ul className="CoPilotNavDropdown">
                            <li><a href="/Pilot selected project">Select project</a></li>
                        </ul>
                    </li>
                    <li><h5>Co-Pilot2</h5>
                        <ul className="CoPilotNavDropdown">
                            <li><a href="/">Add Inventory</a></li>
                            <li><a href="/">Manage  Inventory</a></li>
                        </ul></li>
                </ul>
            </nav>
        </div>
    );
}

export default CoPilotNav;