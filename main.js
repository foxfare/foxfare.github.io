const header = document.querySelector("header");
const sectionOne = document.querySelector(".landing-bg");
const logo = document.querySelector(".logo-text");

const sectionOneOptions = {
    rootMargin: "-120px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            header.classList.add('scrolled');
            logo.classList.add('logo-text-hidden');
        }
        else{
            header.classList.remove('scrolled');
            logo.classList.remove('logo-text-hidden');
        }
    })
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);

function navSlide() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        //Toggle nav
        nav.classList.toggle('nav-active');
        //Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        //burger animation
        burger.classList.toggle('toggle');

    });

}

navSlide();