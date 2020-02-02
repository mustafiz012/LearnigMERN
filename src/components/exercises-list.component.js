import React, {Component} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

//functional react component :: class component
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {
            props.deleteExercise(props.exercise._id)
        }}>Delete</a>
        </td>
    </tr>
);


export default class ExercisesList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({exercises: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteExercise(id) {
        Axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercises => {
            return <Exercise exercise={currentExercises} deleteExercise=
                {this.deleteExercise} key={currentExercises._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="table-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}