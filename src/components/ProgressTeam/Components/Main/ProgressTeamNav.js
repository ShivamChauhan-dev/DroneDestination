import React from 'react';
import "./ProgressTeamNav.css";

function ProgressTeam() {
    return (
        <div>
            <h1>Progress Team Access</h1>
            <nav className="ProgressTeamNav">
                <ul className="ProgressTeamNav-List">
                    <li>
                        <h5>Project</h5>
                        <ul className="ProgressTeamDropdown">
                            <li><a href="/Pilot selected project">Select project</a></li>
                        </ul>
                    </li>
                    <li><h5>Daily Progress</h5>
                        <ul className="ProgressTeamDropdown">
                            <li><a href="/">Add Inventory</a></li>
                            <li><a href="/">Manage  Inventory</a></li>
                        </ul></li>
                </ul>
            </nav>
        </div>
    );
}

export default ProgressTeam;