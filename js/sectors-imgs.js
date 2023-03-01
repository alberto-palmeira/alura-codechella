const mapImg = document.querySelector('[data-map-img]');

if(window.innerWidth >= 768 && window.innerWidth < 1440) {
    mapImg.setAttribute('src', 'img/map/map-tablet.png');
}

if(window.innerWidth >= 1440 ) {
    mapImg.setAttribute('src', 'img/map/map-desktop.png');
}

window.addEventListener('resize', () => {
    if(window.innerWidth >= 768 && window.innerWidth < 1440) {
        mapImg.setAttribute('src', 'img/map/map-tablet.png')
    } else if(window.innerWidth >= 1440){
        mapImg.setAttribute('src', 'img/map/map-desktop.png');
    } else {
        mapImg.setAttribute('src', 'img/map/map-mobile.png');
    }
})