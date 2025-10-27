const Movie = require("../models/MovieModel.js")
const Show = require("../models/ShowModel.js")
const mongoose = require("mongoose")

const getNowPlayingMovies = async (req, res) => {
    try{
        const response = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        })

        const movies = await response.json()

        res.json({success: true, movies: movies})

    } catch (error) {
        console.error(error)
        res.json({success: false, movies: error.message})
    }
}

const addShow = async (req, res)=> {
    try{
        const {movieId, showsInput, showPrice} = req.body
        let movie = await Movie.findById(movieId)

        if(!movie) {
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                }),

                fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                })
            ])

            const movieApiData = await movieDetailsResponse.json()
            const movieCreditsData = await movieCreditsResponse.json()

            console.log(movieApiData)

            let MovieGenres = []
            movieApiData.genres.map(item=> MovieGenres.push(item.name))

            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                backdrop_path: movieApiData.backdrop_path,
                genres: MovieGenres,
                casts: movieCreditsData.cast,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || '',
                vote_average: movieApiData.vote_average,
                poster_path: movieApiData.poster_path,
                runtime: movieApiData.runtime
            }

            movie = await Movie.create(movieDetails)
        }

        const showsToCreate = []
        showsInput.forEach(show=> {
            const showDate = show.date;
            show.time.forEach((time)=> {
                const dateTimeString = `${showDate}T${time}`
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                })
            })
        })

        if(showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate)
        }

        res.json({success: true, message: "show added successfully"})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const getShows = async (req, res) => {
    try{
        const shows = await Show.find({showDateTime: {$gte: new Date(0)}}).populate("movie").sort({showDateTime: 1})
        
        //filter unique shows
        const uniqueShows = new Set(shows.map(show=> show.movie))

        res.json({success: true, shows: Array.from(uniqueShows)})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const getShow = async (req, res) => {
    try{
        const {movieId} = req.params

        //get all upcoming shows for the movie
        const shows = await Show.find({movie: movieId, showDateTime: {$gte: new Date()}})

        const movie = await Movie.findById(movieId)
        const dateTime = {}

        shows.forEach((show)=> {
            const date = show.showDateTime.toISOString().split("T")[0]
            if(!dateTime[date]) {
                dateTime[date] = []
            }
            dateTime[date].push({time: show.showDateTime, showId: show._id})
        })

        res.json({success: true, movie, dateTime})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const search = async (req, res) => {
    try {
        const {q} = req.params
        const movies = await Movie.find({$text: { $search: q }})
        console.log(movies)
        res.json({success: true, results: movies})
    } catch (error) {
        console.error(error)
        res.json({success: false, error: error.message})
    }
}

module.exports = {getNowPlayingMovies, addShow, getShows, getShow, search}