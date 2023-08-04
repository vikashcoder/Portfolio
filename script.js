let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split(" ");
  word.textContent = " ";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
})

let currentwordindex = 0;
let maxwordindex = words.length - 1;
words[currentwordindex].style.opacity = "1";

let changetext = () => {
  let currentword = words[currentwordindex];
  let nextword = currentwordindex === maxwordindex ? words[0] : words[currentwordindex + 1];

  Array.from(currentword.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  nextword.style.opacity = "1";

  Array.from(nextword.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  currentwordindex = currentwordindex === maxwordindex ? 0 : currentwordindex + 1;
};

changetext();
setInterval(changetext, 3000);
//circles percentage
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor(dots * marked / 100);

  var points = "";
  var rotate = 360 / dots;
  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;

  }
  elem.innerHTML = points;
  const pointsMarked = elem.querySelectorAll('.points');
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add('marked');

  }
});
var mixer = mixitup('.portfolio-gallery');
var containerEl = document.querySelector('.portfolio-gallery');

var mixer = mixitup(containerEl, {
  selectors: {
    control: '.filter-buttons .btn' // Selector for the filter buttons
  }
});
// Active menu
let menuli = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');
function activemenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsettop) {

  }
  menuli.forEach(sec => sec.classList.remove("active"));
  menuli[len].classList.add("active");

}

activemenu();
window.addEventListener("scroll", activemenu);


// /sticky navbar
const header = document.querySelectorAll('header');
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 50)
})
// sticky navbar
let menuicon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menuicon.onclick = () => {
  menuicon.classList.toggle("bx-x");
  navlist.classList.toggle("open");

}
window.onclick = () => {
  menuicon.classList.remove("bx-x");
  navlist.classList.replace("open");

}
// parallax
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    }
    else {
      entry.target.classList.remove("show-items");

    }
  })
})

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollbottom = document.querySelectorAll(".scroll-bottom");
scrollbottom.forEach((el) => observer.observe(el));

const scrolltop = document.querySelectorAll(".scroll-top");
scrolltop.forEach((el) => observer.observe(el));

