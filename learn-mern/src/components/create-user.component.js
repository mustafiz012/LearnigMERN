import React, {Component} from "react";
import Axios from "axios";

export default class CreateUsers extends Component {
    isRequested = false;

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
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

    onSubmit(e) {
        e.preventDefault();

        let username = this.state.username;
        const user = {
            username: username,
        };

        if (username.length >= 3) {
            Axios.post('http://localhost:5000/users/add', user)
                .then(res => {
                    console.log(res.data);
                    let statusCode = res.data.status;
                    alert(res.data.message);
                    if (statusCode === 200) {
                        this.setState({
                            username: ''
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
                            onChange={this.onChangeUsername}
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