const inputMovieSearch = document.getElementById("input-movie-search") 
const inputSearchBtn = document.getElementById("input-search-btn")
const movieWatchlist = document.getElementById("movie-watchlist")

const API_KEY = "13df0837"

// Load existing watchlist from localStorage (or empty array)
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

inputSearchBtn.addEventListener("click", searchMovie)

async function searchMovie () {
    const query = inputMovieSearch.value.trim()
    if(!query) {
        return // if input is empty, do nothing
    }

    // Call OMDB API for search results
    const res = await fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=13df0837&s=${query}`)
    const data = await res.json()

    movieWatchlist.innerHTML = "" // clear old results
    if (data.Response === "True") {
        // Loop over each movie in the search results
        for (const movie of data.Search) {
            const detailRes = await fetch (`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=13df0837`)
            const movieDetails = await detailRes.json()
            console.log(movieDetails)

            // Add movie card to the page
            movieWatchlist.innerHTML += `
                <div class="movie">
                   <img src=${movieDetails.Poster} alt=${movieDetails.Title} class="movie-poster">
                   <div class="movie-info">
                        <div class="movie-title-rating">
                            <h3 class="movie-title">${movieDetails.Title}</h3>
                            <img src="/img/star-icon.png" class="icon-rating">
                            <p class="movie-rating">${movieDetails.imdbRating}</p> 
                        </div>
                        <div class="movie-runtime-genre">
                            <p class="movie-runtime">${movieDetails.Runtime}</p> 
                            <p class="movie-genre">${movieDetails.Genre}</p>
                            <div class="add-watchlist">
                                <img src="img/add-icon-light.png" class="add-icon">
                                <button class="watchlist-btn" data-id=${movieDetails.imdbID}>Watchlist</button>
                            </div>
                        </div>
                        <p class="movie-plot">${movieDetails.Plot}</p>
                   </div>
                </div>
            `
        }
        
    }
    else {
         movieWatchlist.innerHTML = `<p class="error-message">Unable to find what you’re looking for. Please try another search.</p>`
    }
}

// Add to watchlist
movieWatchlist.addEventListener("click", async function(e){
    // Check if the clicked element has the class "watchlist-btn"
    if(e.target.classList.contains("watchlist-btn")){
        const imdbID = e.target.dataset.id  // Get the movie's IMDb ID from the button's data-id attribute

        // Check if this movie is already in the watchlist
        if (watchlist.some(m => m.imdbID === imdbID)) return  // If already exists, stop the function

        // Fetch full movie details from OMDB API using the IMDb ID
        const res = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=13df0837`)
        const movieData = await res.json()

        // Add the movie to the watchlist array
        watchlist.push(movieData)
        // Save updated watchlist to localStorage
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
})

