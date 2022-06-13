const header = document.querySelector("header");
const sectionOne = document.querySelector(".land-container");

const sectionOneOptions = {
    rootMargin: "10px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            header.classList.add('scrolled');
        }
        else{
            header.classList.remove('scrolled');
        }
    })
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);