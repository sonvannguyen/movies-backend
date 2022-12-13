const MovieModel = require('../models/Movie')
const fs = require('fs');

const movieController = {
    createNewMovie : async (req, res) => {
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
        const totalMovies = await MovieModel.countDocuments()
        console.log(totalMovies)
    }
}

module.exports = movieController