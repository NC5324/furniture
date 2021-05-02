apiUrl = 'https://unique-fragrant-hospital.glitch.me/api'

async function getCategoryByName(name) {
    const request = {
        name: name
    }
    try {
        return await $.ajax({
            url: `${apiUrl}/category/by-name`,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(request),
            contentType: 'application/json'
        })
    }
    catch(err) {
        console.log(err)
    }
}

$(document).ready(() => {
    $('.nav-link').click((ev) => {
        const categoryTitle = ev.currentTarget.textContent
        getCategoryByName(categoryTitle).then((res) => {
            localStorage.setItem('category', res.id)
            if(window.location.pathname.includes('index.html') || '/furniture/'.includes(window.location.pathname)) {
                window.location.href = './public/browse.html'
            } else {
                window.location.href = './browse.html'
            }
        })
    })
})
