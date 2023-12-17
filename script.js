let API_KEY = "d52d540c";
let BASE_URL = "http://www.omdbapi.com/";

let searchContainer = document.querySelector(".main_container");
let moviesDiv = document.getElementById("showMoviesDiv");
let errorHandlingDiv = document.getElementById("error");
let errorMessage = document.querySelector("#error > h1");
let searchInput = document.getElementById("search_box");

// let screenWidth = window.innerWidth;

searchInput.addEventListener("input", hideErrorMessage);
searchInput.addEventListener("click", hideErrorMessage);

moviesDiv.style.display = "none";
errorHandlingDiv.style.display = "none";

async function searchMovies() {
  const searchInputValue = searchInput.value;

  const API_URL = `${BASE_URL}?apikey=${API_KEY}&t=${searchInputValue}`;

  try {
    let moviesData = await fetch(API_URL);
    let response = await moviesData.json();

    handleNullInput(searchInputValue, response);
  } catch (err) {
    alert("Invalid Movie or Something gets wrong");
    console.error(err);
    window.location.reload();
  }
}

function showMovieResult(data) {
  searchContainer.style.display = "none";

  if (window.innerWidth < 800) {
    moviesDiv.style.display = "block";
  } else {
    moviesDiv.style.display = "flex";
  }

  let backBTN = document.createElement("button");
  backBTN.setAttribute("class", "fa-solid fa-circle-left backBTN");

  backBTN.addEventListener("click", () => {
    window.location.reload();
  });

  let mainViewDiv = document.createElement("div");
  mainViewDiv.setAttribute("class", "main_view");

  let posterDiv = document.createElement("div");
  posterDiv.setAttribute("class", "poster");

  let imgPosters = document.createElement("img");
  imgPosters.src = data.Poster;

  posterDiv.append(imgPosters);
  mainViewDiv.append(posterDiv);

  let detailsDiv = document.createElement("div");
  detailsDiv.setAttribute("class", "details");

  let title = document.createElement("h1");
  title.innerText = data.Title;

  let ReleasedTitle = document.createElement("h3");
  ReleasedTitle.innerText = data.Released;

  let actorsName = document.createElement("h4");
  actorsName.innerText = "Actors -- " + data.Actors;

  let GenreName = document.createElement("h4");
  GenreName.innerText = "Genre -- " + data.Genre;

  let aboutMovie = document.createElement("p");
  aboutMovie.innerText = "About Movie  -- " + data.Plot;

  let RatingUL = document.createElement("ul");

  RatingUL.innerText = " Ratings --";

  let li1 = document.createElement("li");
  li1.innerText = data.Ratings[0].Value + " by " + data.Ratings[0].Source;

  RatingUL.append(li1);

  let country = document.createElement("h4");
  country.innerText = "Country -- " + data.Country;

  let awards = document.createElement("h4");
  awards.innerText = "Awards -- " + data.Awards;

  detailsDiv.append(
    title,
    ReleasedTitle,
    actorsName,
    GenreName,
    aboutMovie,
    RatingUL,
    country,
    awards
  );

  moviesDiv.append(backBTN, mainViewDiv, detailsDiv);
}

function movieNotFound(data) {
  if (data.Response === false || data.Error !== undefined) {
    errorHandler(data);
  }
}

function errorHandler(data) {
  errorHandlingDiv.style.display = "flex";

  if (data.Error !== undefined) {
    errorMessage.innerText = data.Error;
  }
}

function handleNullInput(searchInputValue, response) {
  if (
    searchInputValue === "" ||
    searchInputValue === undefined ||
    searchInputValue === null
  ) {
    errorHandler(response);
    errorMessage.innerText = "Enter Movie Name";
  } else {
    if (response.Error !== undefined) {
      movieNotFound(response);
    } else {
      showMovieResult(response);
    }
  }
}

function hideErrorMessage() {
  errorHandlingDiv.style.display = "none";
}
