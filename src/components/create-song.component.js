import React, {Component} from "react";
import Axios from "axios";

export default class CreateSong extends Component {
    constructor(props) {
        super(props);

        //listeners
        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onLyricsChanged = this.onLyricsChanged.bind(this);
        this.onArtistChanged = this.onArtistChanged.bind(this);
        this.onYearChanged = this.onYearChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            lyrics: '',
            artist: '',
            year: '',
        }
    }

    onTitleChanged(e) {
        this.setState({
            title: e.target.value
        });
    }

    onLyricsChanged(e) {
        this.setState({
            lyrics: e.target.value
        });
    }

    onArtistChanged(e) {
        this.setState({
            artist: e.target.value
        });
    }

    onYearChanged(e) {
        this.setState({
            year: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let title = this.state.title;
        const song = {
            title: title,
            artist: this.state.artist,
            year: this.state.year
        };

        if (title.length >= 3) {
            Axios.post('http://localhost:5000/songs/add', song)
                .then(res => {
                    console.log(res.data);
                    let statusCode = res.data.status;
                    alert(res.data.message);
                    if (statusCode === 200) {
                        this.setState({
                            title: '',
                            artist: '',
                            year: ''
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
                <h3>Enter new song info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="form-group">
                            <label>Song Title: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onTitleChanged}
                            />
                        </div>
                        <div className="form-group">
                            <label>Song Lyrics: </label>
                            <input
                                type="text"
                                placeholder="Optional"
                                className="form-control"
                                value={this.state.lyrics}
                                onChange={this.onLyricsChanged}
                            /></div>
                        <div className="form-group">
                            <label>Artist Name: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.artist}
                                onChange={this.onArtistChanged}
                            /></div>
                        <div className="form-group">
                            <label>Release Year: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.year}
                                onChange={this.onYearChanged}
                            /></div>
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Song"
                            className="btn btn-primary"
                        />
                    </div>

                </form>
            </div>
        );
    }
}