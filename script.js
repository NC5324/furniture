$(document).ready(function (){
    $('h3').click(function(){
        window.location.href='browse.html'
    })

    $('#logo').click(function (){
        window.location.href='index.html'
    })

    document.getElementById('up').onclick = function() {
        $("html, body").animate({ scrollTop: 0 }, 100);
        return false;
    }

    const button = document.querySelector('#up')
    button.style.display = 'none'
    const jumbotron = document.querySelector('.jumbotron')

    let lastScrollTop = 0

    document.querySelector('.jumbotron').onscroll = function () {

        let st = jumbotron.scrollTop
        let st2 = document.querySelector('html').scrollTop
        console.log(st, st2)
        $("html, body").animate({ scrollTop: st2 + st }, 100);

        lastScrollTop = st <= 0 ? 0 : st;
        return false;
    }

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


