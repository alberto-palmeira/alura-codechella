const aboutImg = document.querySelector('[data-about-img]');

if(window.innerWidth >= 768) {
    aboutImg.setAttribute('src', 'img/about/about.png')
} else {
    aboutImg.setAttribute('src', 'img/about/about-mobile.png');
}

window.addEventListener('resize', () => {
    if(window.innerWidth >= 768) {
        aboutImg.setAttribute('src', 'img/about/about.png')
    } else {
        aboutImg.setAttribute('src', 'img/about/about-mobile.png');
    }
})
