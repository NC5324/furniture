$(document).ready(function (){

    const carouselImages = document.querySelectorAll('.carousel-item-image')
    const header = document.querySelector('.header').getBoundingClientRect()
    const height = window.innerHeight - header.bottom - 40 - window.scrollY;
    for(let i=0; i<carouselImages.length; i++) {
        carouselImages[i].style.setProperty('height', `${height}px`)
    }

    $('h3').click(function(){
        if(window.location.pathname.includes('index.html') || '/furniture/'.includes(window.location.pathname)) {
            window.location.href = './public/browse.html'
        } else {
            window.location.href = './browse.html'
        }
    })

    $('#logo').click(function (){
        window.location.href='../index.html'
    })

    document.getElementById('up').onclick = function() {
        $("html, body").animate({ scrollTop: 0 }, 100);
        return false;
    }

    const button = document.querySelector('#up')
    button.style.display = 'none'

    $(window).scroll(function () {
        if(window.scrollY > 100) {
            button.style.display = 'block'
        }
        else {
            button.style.display = 'none'
        }
    })

    $('#fb').click(function(){
        window.location.href="http://facebook.com"
    })
    $('#insta').click(function(){
        window.location.href="http://instagram.com"
    })
})


