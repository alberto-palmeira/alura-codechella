const accessibilityImg = document.querySelector('[data-accessibility-img]');
const sustentabilityImg = document.querySelector('[data-sustentability-img]');
const attractionsImg = document.querySelector('[data-attractions-img]');

const images = [
    {
        element: accessibilityImg,
        type: 'accessibility'
    },

    {
        element: sustentabilityImg,
        type: 'sustentability'
    },

    {
        element: attractionsImg,
        type: 'attractions'
    }
]

if(window.innerWidth >= 768) {
    images.forEach(object =>
        object.element.setAttribute('src', defineImgPath(object, ""))
    )
}

window.addEventListener('resize', () => {
    if(window.innerWidth >= 768) {
        images.forEach(object =>
            object.element.setAttribute('src', defineImgPath(object, ""))    
        )
    } else {
        images.forEach(object =>
            object.element.setAttribute('src', defineImgPath(object, "-mobile"))    
        )
    }   
})

function defineImgPath(object, viewport) {
    if(object.type == 'accessibility') {
        return `img/accessibility/accessibility${viewport}.png`;
    }
    
    if(object.type == 'sustentability') {
        return `img/sustentability/sustentability${viewport}.png`;
    }
    
    if(object.type == 'attractions') {
        return `img/attractions/attractions${viewport}.png`;
    }
}