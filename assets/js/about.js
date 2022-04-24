var val = localStorage.getItem("dataKey");
var movie = JSON.parse(val);

var title = document.getElementById("title");
var Year = document.getElementById("Year");
var Director = document.getElementById("Director");
var Awards = document.getElementById("Awards");
var Genre = document.getElementById("Genre");
var Plot = document.getElementById("Plot");
var imdbRating = document.getElementById("imdbRating");
var img = document.getElementById("moviePoster");
var btn = document.getElementById("fav-list");
var homeBtn = document.getElementById("homeBtn");
var favBtn = document.getElementById("favBtn");

title.innerHTML += "   " + movie.title;
img.src = movie.moviePoster;
Year.innerHTML += "    " + movie.Year;
Director.innerHTML += "  " + movie.Director;
Awards.innerHTML += "  " + movie.Awards;
Genre.innerHTML += "  " + movie.Genre;
Plot.innerHTML += "   " + movie.Plot;
imdbRating.innerHTML += "   " + movie.imdbRating;

var str = localStorage.getItem("favMovie");


btn.onclick = function (e) {
  //check weather this is already in the str or not
  if (str != null && str.includes(movie.title)) {
    window.alert("Already in Favourites");
  } else {
    str += "," + movie.title;
    localStorage.setItem("favMovie", str);
    window.alert("Successfully Added");
  }
};

// func to handle click on home button
homeBtn.onclick = function () {
  window.location.href = "index.html";
};

// func to handle click on Favourite button
favBtn.onclick = function () {
  window.location.href = "favourites.html";
};
