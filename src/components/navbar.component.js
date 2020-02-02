import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/edit/:id" className="nav-link">Edit Exercise</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/userList" className="nav-link">User List</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/songList" className="nav-link">Song List</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create_song" className="nav-link">Create Song</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}