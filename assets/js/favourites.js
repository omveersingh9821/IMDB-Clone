try {
  var favMoviesList = localStorage.getItem("favMovie").split(",");
  var favMoviesList = favMoviesList.filter(function (e) {
    return e !== "null";
  });
 
  if (favMoviesList.length == 0) {
    window.alert("Nothing in favourite");
    window.location.href = history.back();
  }
} catch {
  window.alert("Nothing in favourite");
  window.location.href = history.back();
}
var ul = document.getElementById("lists");

async function favtab() {
  var count = 0;
  for (let x of favMoviesList) {
    if (x != "null") {
      console.log(x);
      var li = document.createElement("li");
      var img = document.createElement("img");
      var deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "button-52");
      img.setAttribute("class", "MoviePoster");

      ul.appendChild(li);

      deleteButton.appendChild(document.createTextNode("Remove"));
      li.appendChild(img);
      li.appendChild(document.createTextNode(x));
      li.value = count;
      li.appendChild(deleteButton).addEventListener("click", removeItem);
      webLink = `https://www.omdbapi.com/?i=tt3896198&apikey=de1fde66&t=${x}`;
      var result = await fetch(webLink);
      var data = await result.json();
      img.src = data.Poster;
    }
    count++;
  }
}
homeBtn.onclick = function () {
  window.location.href = "index.html";
};
var elements = document.getElementsByClassName("btn");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", removeItem);
}

//func to remove movie from local storage and li
function removeItem() {
  var name = favMoviesList[this.parentNode.value];
  var filteredArray = favMoviesList.filter(function (e) {
    return e !== name;
  });

  //console.log(filteredArray);
  var str = "null";
  for (var i = 0; i < filteredArray.length; i++) {
    str += "," + filteredArray[i];
  }
  localStorage.setItem("favMovie", str);
  this.parentNode.remove();

  //reload after every deletion
  window.location.reload();
}
favtab();
