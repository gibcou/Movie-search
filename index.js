const searchInput = document.querySelector('.search-input');
  const movieList = document.querySelector('.movie-list');
  let search = 'movie';

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }


  fetchMovies(search);

  async function fetchMovies(searchTerm) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=7764f155`);
      const moviedata = await response.json();

      if (moviedata.Search && moviedata.Search.length > 0) {
        movieList.innerHTML = moviedata.Search.map((movie) => movieHTML(movie)).join('');
      } else {
        movieList.innerHTML = '<p>No movies found.</p>';
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      movieList.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
  }

  function showMovieimdb(imdbID) {
    window.open(`https://www.imdb.com/title/${imdbID}`, '_blank');
  }

  function movieHTML(movie) {
    return `<div class="movie-card" onclick="showMovieimdb('${movie.imdbID}')">
      <div class="movie-card__container">
        <h3>${movie.Title}</h3>
        <p class="movie-year"><b>Year:</b> ${movie.Year}</p>
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title} Poster" />
      </div>
    </div>`;
  }

  function handleSearch(event) {
    search = event.target.value;
    fetchMovies(search);
  }

window.showMovieimdb = showMovieimdb;

function sortMovies() {
  const select = document.getElementById('sort');
  const criteria = select.value;
  const movieList = document.querySelector('.movie-list');
  const movies = Array.from(movieList.children);

  movies.sort((a, b) => {
    const titleA = a.querySelector('h3').innerText.toLowerCase();
    const titleB = b.querySelector('h3').innerText.toLowerCase();

    const yearA = parseInt(a.querySelector('.movie-card__container p:nth-of-type(2)').innerText.replace(/\D/g, ''), 10);
    const yearB = parseInt(b.querySelector('.movie-card__container p:nth-of-type(2)').innerText.replace(/\D/g, ''), 10);

    if (criteria === 'title') {
      return titleA.localeCompare(titleB);
    } else if (criteria === 'year') {
      return yearA - yearB;
    }
    return 0;
  });

  
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }

  
  movies.forEach(movie => {
    movieList.appendChild(movie);
  });
}


