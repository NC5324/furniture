//const slides = ['#FF9100', 'red', 'blue', 'yellow', 'purple']
const slides = ['url("assets/01.jpg")', 'url("assets/02.jpg")']
let index = 0;

function slideToRight() {
    index++;
    if(index >= slides.length) {
        index = index - slides.length;
    }
    const carousel = $('.carousel')
    carousel.css('background', `${slides[index]} no-repeat center`)
    carousel.css('background-size', `100% 100%`)
}

function slideToLeft() {
    index--;
    if(0 > index) {
        index = slides.length + index;
    }
    const carousel = $('.carousel')
    carousel.css('background', `${slides[index]} no-repeat center`)
    carousel.css('background-size', `100% 100%`)
}

$(document).ready(() => {
    $('.btn-r').on('click', () => {
        slideToRight()
        console.log(index)
        clearInterval(myTimer)
        myTimer = window.setInterval(slideToRight, 5000)
    })

    $('.btn-l').on('click', () => {
        slideToLeft()
        console.log(index)
        clearInterval(myTimer)
        myTimer = window.setInterval(slideToRight, 5000)
    })

    let myTimer = window.setInterval(slideToRight, 5000)
})
