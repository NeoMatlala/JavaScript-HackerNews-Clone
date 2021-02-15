// This is the main JS file

import RouterHandler from './router.js'

//since I'm using hasRouter, I use the onhashChange property
window.onhashchange = () => {
    setActiveLink();
}

// function that sets active link to nav links to show user which page they're on
function setActiveLink() {
    const links = document.querySelectorAll('.header-link');

    links.forEach( link => {
        const linkPath = link.getAttribute('href')
        const currentPath = window.location.hash

        if(linkPath === currentPath) {
            link.classList.add('active')
        } else {
            link.classList.remove('active')
        }
    })
}


// main class
class App {
    constructor(){
        new RouterHandler();
    }
}

// instance of our class
new App