$(document).ready(() => {
    $('.nav-link').click(() => {
        if(window.location.pathname.includes('index.html') || '/furniture/'.includes(window.location.pathname)) {
            window.location.href = './public/browse.html'
        } else {
            window.location.href = './browse.html'
        }
    })
})
