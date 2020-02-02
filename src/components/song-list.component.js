import React, {Component} from "react";
import Axios from "axios";

//functional react component :: class component
const Song = props => (
    <tr>
        <td>{props.song.title}</td>
        <td>{props.song.lyrics}</td>
        <td>{props.song.artist}</td>
        <td>{props.song.year}</td>
        <td><a href="#" onClick={() => {
            props.deleteSong(props.song._id)
        }}>Delete</a>
        </td>
    </tr>
);


export default class SongList extends Component {

    constructor(props) {
        super(props);

        this.deleteSong = this.deleteSong.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchStringChanged = this.onSearchStringChanged.bind(this);

        this.state = {
            songList: [],
            searchString: ''
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/songs/getSongList')
            .then(response => {
                this.setState({songList: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onSearchStringChanged(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let searchString = this.state.searchString;
        if (searchString.trim().length >= 1) {
            Axios.get('http://localhost:5000/songs/getSongList/' + searchString)
                .then(response => {
                    this.setState({songList: response.data})
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            alert('Search field cannot be empty.')
        }
    }

    deleteSong(id) {
        Axios.delete('http://localhost:5000/songs/delete/' + id)
            .then(res => console.log(res.data));

        this.setState({
            songList: this.state.songList.filter(el => el._id !== id)
        })
    }

    songList() {
        return this.state.songList.map(currentSongList => {
            return <Song song={currentSongList} deleteSong=
                {this.deleteSong} key={currentSongList._id}/>
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" aria-orientation={"horizontal"}>
                        <input
                            type="text"
                            required
                            placeholder="Search by Song Title, Artist or Year"
                            className="form-control"
                            value={this.state.searchString}
                            onChange={this.onSearchStringChanged}
                        />
                        <input
                            type="submit"
                            value="Search"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
                <div>
                    <h3>Song List</h3>
                    <table className="table">
                        <thead className="table-light">
                        <tr>
                            <th>Song Title</th>
                            <th width={300}>Lyrics (Optional)</th>
                            <th>Artist</th>
                            <th>Release Year</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.songList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}