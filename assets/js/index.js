var searchInput = "";
var url = "";
var count = 0;
var dataResponse = true;
var suggestions = [];
var favourites = [];

//function to fill suggestion-box with respect to input text
async function fillArr(movies) {
  let i = 0;
  // console.log(movies)
  for (let res of movies) {
    suggestions[i] = res.Title;
    i++;
  }
  //  console.log(suggestions)
}

// function to search in API
async function search(e) {
  e.preventDefault();
  searchInput += e.key;
  url ="https://www.omdbapi.com/?i=tt3896198&apikey=de1fde66" + "&s=" + searchInput;
  var result = await fetch(url);
  var data = await result.json();
  var movies = data.Search;
  dataResponse = data.Response;
  if (dataResponse == "True") {
    fillArr(movies);
  }
}

// declaration for
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = async (e) => {
  await search(e);
  let userData = e.target.value; //user entered data

  let emptyArray = [];
  if (userData) {
    icon.onclick = async () => {
      if (dataResponse == "True") {
        webLink = `https://www.omdbapi.com/?i=tt3896198&apikey=de1fde66&t=${userData}`;
        var result = await fetch(webLink);
        var data = await result.json();
        var getData = {
          title: data.Title,
          moviePoster: data.Poster,
          Year: data.Year,
          Genre: data.Genre,
          Awards: data.Awards,
          imdbRating: data.imdbRating,
          Director: data.Director,
          Plot: data.Plot,
          Actors: data.Actors,
        };
        localStorage.setItem("dataKey", JSON.stringify(getData));

        window.location.href = "about.html";

        //if no movie like input provided
      } else {
        window.alert("Sorry!! Never Heard About This Movie");
        window.location.reload();
      }
    };

    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars

      return data.toLocaleLowerCase();
    });

    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag

      return (data = `<li>${data}</li>`);
    });

    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};
async function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = async () => {
    // if response is
    if (dataResponse == "True") {
      webLink = `https://www.omdbapi.com/?i=tt3896198&apikey=de1fde66&t=${selectData}`;

      var result = await fetch(webLink);
      var data = await result.json();
      var getData = {
        title: data.Title,
        moviePoster: data.Poster,
        Year: data.Year,
        Genre: data.Genre,
        Awards: data.Awards,
        imdbRating: data.imdbRating,
        Director: data.Director,
        Plot: data.Plot,
        Actors: data.Actors,
      };
      localStorage.setItem("dataKey", JSON.stringify(getData));

      window.location.href = "about.html";
    } else {
      window.alert("Sorry!! Not Released till now");
      window.location.reload();
    }
  };
  searchWrapper.classList.remove("active");
}
function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}
var favBtn = document.getElementById("favouritePage");
favBtn.onclick = function (e) {
  window.location.href = "favourites.html";
};
