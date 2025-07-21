
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
        <p><b>Year:</b> ${movie.Year}</p>
        <p><b>Poster:</b> <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title} Poster" width="150"></p>
      </div>
    </div>`;
  }

  function handleSearch(event) {
    search = event.target.value;
    fetchMovies(search);
  }
;