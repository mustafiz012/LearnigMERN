import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import CreateSong from "./components/create-song.component";
import UserList from "./components/user-list.component";
import SongList from "./components/song-list.component";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar/>
                <br/>
                <Route path="/" exact component={ExercisesList}/>
                <Route path="/edit/:id" component={EditExercise}/>
                <Route path="/create" component={CreateExercise}/>
                <Route path="/userList" component={UserList}/>
                <Route path="/user" component={CreateUser}/>
                <Route path="/songList" component={SongList}/>
                <Route path="/create_song" component={CreateSong}/>
            </div>
        </Router>
    );
}

export default App;
