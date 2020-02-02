const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/')
    .get((req, res) => {
        Song.find()
            .then(songs => res.json(songs))
            .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/getSongList')
    .get((req, res) => {
        Song.find()
            .then(songs => res.json(songs))
            .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/getSongList/:searchString')
    .get((req, res) => {
        const multiQuery = {
            $or: [{
                title: {
                    $regex: req.params.searchString,
                    $options: 'i'
                }
            }, {
                artist: {
                    $regex: req.params.searchString,
                    $options: 'i'
                }
            }, /*{
                year: {
                    $regex: req.params.searchString,
                    $options: 'i'
                }
            }*/]
        };

        const query = {year: req.params.searchString};
        console.log(query);
        console.log(multiQuery);

        Song.find(multiQuery, function (err, songs) {
            if (err) {
                res.json([])
            } else {
                res.json(songs)
            }
        });
    });

router.route('/delete/:id').delete((req, res) => {
    Song.findByIdAndDelete(req.params.id)
        .then(() => res.json('Song deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const lyrics = req.body.lyrics;
    const artist = req.body.artist;
    const year = req.body.year;

    //checking if requested new title is valid
    if (title) {
        const query = {title: title};
        Song.find(query, function (err, users) {
            if (err) {
                res.json({status: 500, success: false, message: 'Internal server error!', errorMessage: err})
            } else {
                if (users.length <= 0) {
                    //proceed to create new Song
                    const newSong = new Song({title, lyrics, artist, year});
                    newSong.save()
                        .then(() => res.json({status: 200, success: true, message: 'Song added!'}))
                        .catch(err => res.json({
                            status: 500,
                            success: false,
                            message: 'Internal server error!',
                            errorMessage: err
                        }));
                } else {
                    res.json({status: 409, success: false, message: 'Title is already taken!'})
                }
            }
        });
    } else {
        res.json({status: 400, success: false, message: 'Title cannot be empty!'})
    }
});

module.exports = router;