const MovieModel = require('../models/Movie')
const fs = require('fs');

const movieController = {
    createNewMovie : async (req, res) => {
        // === create movies from data in file movies.json

        // try {
        //     fs.readFile(`F:/backend web phim/movies.json`, 'utf8', (err, data) => {
        //         if (err) {
        //           console.error(err);
        //           return;
        //         }
        //         const movieData = JSON.parse(data)
        //         movieData.forEach(async(item, index) => {
        //             const newMovie = new MovieModel(item)
        //             await newMovie.save()
        //             console.log('save ', index)
        //         })
        //         console.log('SUCCESSSSSSSSSSSSSSSSSSSSSS')
        //     });
            
        // } catch (error) {
        //     console.log(error)
        // }
    },

    searchMovieByName: async(req, res) => {
        try {
            const {movieName } = req.query
            const movies = await MovieModel.find({
                $or: [
                    {name: {$regex: movieName, $options: "i"}},
                    {origin_name: {$regex: movieName, $options: "i"}}
                ]
            })  

            if(movies.length == 0){
                return res.json({respond: "Not found"})  
            }
            res.json({movies})
            
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = movieController