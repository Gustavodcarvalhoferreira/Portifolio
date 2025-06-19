const navbar = document.getElementById("navbar");
const aboutSection = document.getElementById("About");
const skillSection = document.getElementById("Skill");


const checkIntersection = (entries) => {
  let isVisible = false;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      isVisible = true;
    }
  });

  if (isVisible) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
};

const observer = new IntersectionObserver(checkIntersection, {
  root: null,
  threshold: 0.4
});

observer.observe(aboutSection);
observer.observe(skillSection);
