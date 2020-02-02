import React, {Component} from "react";
import Axios from "axios";

//functional react component :: class component
const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td><a href="#" onClick={() => {
            props.deleteUser(props.user._id)
        }}>Delete</a>
        </td>
    </tr>
);


export default class UserList extends Component {

    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = {userList: []};
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/users/getUserList')
            .then(response => {
                this.setState({userList: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteUser(id) {
        Axios.delete('http://localhost:5000/users/delete/' + id)
            .then(res => console.log(res.data));

        this.setState({
            userList: this.state.userList.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.userList.map(currentUserList => {
            return <User user={currentUserList} deleteUser=
                {this.deleteUser} key={currentUserList._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>User List</h3>
                <table className="table">
                    <thead className="table-light">
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.userList()}
                    </tbody>
                </table>
            </div>
        );
    }
}