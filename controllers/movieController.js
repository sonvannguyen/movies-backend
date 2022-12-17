const MovieModel = require('../models/Movie')
const fs = require('fs');

// xử lí khi người dùng tìm kiếm tên phim mà không gõ dấu . Tận dụng slug có sẵn trong db để tìm kiếm.

const convertToSlug = (movieName) => {
    const arrWord = movieName.split(" ").filter(word => word !== "")
    let movieSlug = ""
    for(let i = 0; i < arrWord.length - 1; i++){
        movieSlug += arrWord[i] + "-"
    }
    movieSlug += arrWord[arrWord.length-1] 
    
    return movieSlug
}

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
            console.log(convertToSlug(movieName))
            console.log(movieName)

            const movies = await MovieModel.find({
                $or: [
                    {
                        name: {
                            $regex: movieName, $options: "i"
                        }
                    },
                    {
                        origin_name: {
                            $regex: movieName, $options: "i"
                        }
                    },
                    {
                        slug: {
                            $regex: convertToSlug(movieName), $options: "i"
                        }
                    }
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