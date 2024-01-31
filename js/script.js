const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Handeling mobile navigation

const navButton = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

navButton.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Smooth scrolling animation - dla niewspierajcych przeglądarek

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // Scroluj na spowrotem na góre:

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Przeskroluj do innych linków
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// Zrobienie headera sticky po tym jak minie sekcje hero

const sectionHeroEL = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      // console.log(ent);
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      // console.log(ent);
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    // Jak tylko 0% sekcji hero jest w viewport
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEL);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
