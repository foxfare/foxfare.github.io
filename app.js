const header = document.querySelector("header");
const sectionOne = document.querySelector(".land-container");
const logo = document.querySelector(".logo-text");

const sectionOneOptions = {
    rootMargin: "-100px 0px 0px 0px"
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