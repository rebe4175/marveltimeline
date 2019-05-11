window.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", resizeCircle);

function init() {
  console.log("INIT");
  fetch("marveltemplate.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#svg_timeline")
        .insertAdjacentHTML("afterbegin", svgData);

      loadJSON();

      resizeCircle();
    });
}

function addAnimation() {
  console.log("something");
}

function loadJSON() {
  fetch("marvel.json")
    .then(response => response.json())
    .then(jsonData => {
      jsonData.forEach(movie => {
        //clone

        const template = document.querySelector("#movie_template");

        let clone = template.cloneNode(true).content;

        //put data in clone

        clone.querySelector("[data-field='title']").textContent = movie.title;
        clone.querySelector("[data-field='year']").textContent = movie.year;

        //append clone

        const destination = document.querySelector(
          ".svgplaceholder[data-svgplaceholder='" + movie.id + "']"
        );

        destination.appendChild(clone);
      });
    });
}

function resizeCircle() {
  const svgplaceholders = document.querySelectorAll(".svgplaceholder");
  svgplaceholders.forEach(replaceSVGwithHTML);
}

function replaceSVGwithHTML(htmlElement) {
  //we got an html element with data-svgplacheholder
  //find matching svg-element

  const svgId = htmlElement.dataset.svgplaceholder;
  const svgSelector = "#" + svgId + " .HTML_placeholder";

  fitRectangle(svgSelector, htmlElement);
}

function fitRectangle(svgElement, htmlElement) {
  svgElement = document.querySelector(svgElement);

  getRect = svgElement.getBoundingClientRect();

  // htmlElement = document.querySelector(htmlElement);

  //left
  htmlElement.style.left = getRect.x + "px";
  //top
  htmlElement.style.top = getRect.y + "px";
  //width
  htmlElement.style.width = getRect.width + "px";
  //height
  htmlElement.style.height = getRect.height + "px";
}

//getBoundingCLientRect
//function to resize whenever window changes
