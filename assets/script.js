"use strict";

var selectAll = function selectAll(query) {
  return Array.from(document.querySelectorAll(query));
};

function changeVhVar() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
}

function setSections(sections, holder) {
  var routes = [];
  sections.forEach(function (s) {
    holder.appendChild(createThumb(s));
    routes.push(s.getAttribute('data-slug'));
  });
  var spacer = document.createElement('div');
  spacer.classList.add('Spacer');
  holder.appendChild(spacer);
  return routes;
}

function createThumb(section) {
  var title = section.getAttribute('data-title');
  var div = document.createElement('div');
  div.setAttribute('data-link', section.getAttribute('data-slug'));
  div.classList.add('thumb');
  div.innerHTML = "<span>".concat(title, "</span>");
  var bgImage = section.getAttribute('data-image');
  if (bgImage) div.style.backgroundImage = "url(".concat(bgImage, ")");
  div.addEventListener('click', function () {
    setSelected(this);
    section.scrollIntoView();
  });
  return div;
}

function setSelected(selected) {
  selectAll('.thumb').forEach(function (t) {
    return t.classList.remove('active');
  });
  selected.classList.add('active');
  location.hash = selected.getAttribute('data-link');
}

window.addEventListener('load', function () {
  changeVhVar();
  var sections = selectAll('#main section');
  var thumbHolder = document.querySelector('#thumbnails .Thumbnails');
  var scrollButtons = selectAll('.scroll-button');
  scrollButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var link = e.target.getAttribute('data-link-to');
      var post = document.querySelector("[data-post-link=\"".concat(link, "\"]"));
      post.scrollIntoView();
    });
  });
  var routes = setSections(sections, thumbHolder);
  var theHash = location.hash.substr(1);

  if (routes.includes(theHash)) {
    document.querySelector("[data-link=\"".concat(theHash, "\"]")).click();
  } else {
    document.querySelector('.thumb').click();
  }

  window.addEventListener('resize', function () {
    changeVhVar();
    setTimeout(function () {
      var theHash = location.hash.substr(1);

      if (routes.includes(theHash)) {
        var section = document.querySelector("[data-slug=\"".concat(theHash, "\"]"));
        section.scrollIntoView();
      } else {
        document.querySelector('.thumb').click();
      }
    }, 200);
  });
  var influencersType = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    gap: 40
  }).mount();
});