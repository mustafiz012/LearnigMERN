import React, {Component} from "react";
import Axios from "axios";

export default class CreateUsers extends Component {
    isRequested = false;

    constructor(props) {
        super(props);

        //listeners
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            name: '',
            email: '',
        }
    }

    onUsernameChanged(e) {
        let username = e.target.value;
        // console.log('Username: ' + username);

        /*//checking if username already exists or not
        if (username && !this.isRequested) {
            this.isRequested = true;
            Axios.get('http://localhost:5000/users/checkValidity/' + username)
                .then(response => {
                    this.isRequested = false;
                    if (response.data && !response.data.valid) {
                        alert('Username is already taken!')
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }*/

        this.setState({
            username: username
        });
    }

    onNameChanged(e) {
        this.setState({
            name: e.target.value
        });
    }

    onEmailChanged(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let username = this.state.username;
        const user = {
            username: username,
            name: this.state.name,
            email: this.state.email
        };

        if (username.length >= 3) {
            Axios.post('http://localhost:5000/users/add', user)
                .then(res => {
                    console.log(res.data);
                    let statusCode = res.data.status;
                    alert(res.data.message);
                    if (statusCode === 200) {
                        this.setState({
                            username: '',
                            name: '',
                            email: ''
                        })
                    } else if (statusCode === 500) {
                        console.log(res.data.errorMessage)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            alert('Number of character must be 3 or more.');
        }
    }

    render() {
        return (
            <div>
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onUsernameChanged}
                        />
                        <label>Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onNameChanged}
                        />
                        <label>Email: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onEmailChanged}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>

                </form>
            </div>
        );
    }
}