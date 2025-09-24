const myWatchlistSection = document.getElementById("myWatchlist")

// Load watchlist from localStorage
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

function renderWatchlist() {
    if(watchlist.length === 0) {
       // If empty, show default message 
       myWatchlistSection.innerHTML = `
             <div class="myWatchlist-default-state">
                <h3 class="myWatchlist-default-title">Your watchlist is looking a little empty...</h3>
                <a href="index.html" class="myWatchlist-add">
                    <img class="myWatchlist-icon" src="img/add-icon-light.png">
                    <p class="myWatchlist-hint">Let’s add some movies!</p>
                </a>
            </div>
       `
       return 
    }
    // Otherwise, display each movie from watchlist
    myWatchlistSection.innerHTML = watchlist.map(movie => `
        <div class="movie">
            <img src=${movie.Poster} alt=${movie.Title} class="movie-poster">
            <div class="movie-info">
                <div class="movie-title-rating">
                    <h3 class="movie-title">${movie.Title}</h3>
                    <img src="/img/star-icon.png" class="icon-rating">
                    <p class="movie-rating">${movie.imdbRating}</p> 
                </div>
                <div class="movie-runtime-genre">
                    <p class="movie-runtime">${movie.Runtime}</p> 
                    <p class="movie-genre">${movie.Genre}</p>
                    <div class="remove-watchlist">
                        <img src="img/remove-icon.png" class="remove-icon">
                        <button class="remove-btn" data-id=${movie.imdbID}>Remove</button>
                    </div>
                </div>
                <p class="movie-plot">${movie.Plot}</p>
            </div>
        </div>
    `).join("")
    
}

// Remove watchlist
myWatchlistSection.addEventListener("click", function(e){
   // If a remove button was clicked
   if(e.target.classList.contains("remove-btn")){
      const removeId = e.target.dataset.id  // get the movie id

      // Create a new array without that movie
      watchlist = watchlist.filter(function(m){
          return m.imdbID !== removeId
      })

      // Save updated watchlist to localStorage and re-render
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
      renderWatchlist ()
   }
})

renderWatchlist() // Render the watchlist on first load