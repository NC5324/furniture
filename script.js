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

    $(window).scroll(function () {
        if(window.scrollY > 100) {
            button.style.display = 'block'
        }
        else {
            button.style.display = 'none'
        }
    })
})


