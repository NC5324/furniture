class Review {
    constructor(id, title, rating, description, author, date) {
        this.id = id
        this.title = title
        this.rating = rating
        this.description = description
        this.author = author
        this.date = date
    }
}

$(document).ready(() => {
    console.log('DOM fully loaded')

    const reviews = [
        new Review(0, 'Review', 1, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(1, 'Review', 1, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(2, 'Review', 1, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(3, 'Review', 2, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(4, 'Review', 3, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(5, 'Review', 5, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(6, 'Review', 5, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(6, 'Review', 4, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(6, 'Review', 4, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
        new Review(6, 'Review', 5, 'Lorem ipsum dolor sit amet', 'NC Durmush', '25-04-2021'),
    ]

    const details = {
        count: reviews.length,
        average: (() => {
            let sum = 0
            for(let i=0;  i<reviews.length; i++) {
                sum += reviews[i].rating
            }
            const avg = sum / reviews.length
            return Math.round( avg * 10 + Number.EPSILON ) / 10
        })(),
        list: [
            {
                title: '5 звезди',
                count: reviews.filter(x => x.rating === 5).length
            },
            {
                title: '4 звезди',
                count: reviews.filter(x => x.rating === 4).length
            },
            {
                title: '3 звезди',
                count: reviews.filter(x => x.rating === 3).length
            },
            {
                title: '2 звезди',
                count: reviews.filter(x => x.rating === 2).length
            },
            {
                title: '1 звезда',
                count: reviews.filter(x => x.rating === 1).length
            }
        ]
    }

    // set product details
    const product = JSON.parse(localStorage.getItem('product'))

    let section1 = document.getElementById('section1')
    const pics = document.getElementById('template-product-pics').content.cloneNode(true)
    pics.querySelector('.pic-main').style.backgroundImage = `url("${product.thumbnail}")`
    section1.appendChild(pics)

    let section2 = document.getElementById('section2')
    section2.style.height = Math.round(document.querySelector('.pic-main').getBoundingClientRect().height) + 'px'

    // set product title/categories and rating
    const pHeader = document.getElementById('template-product-header').content.cloneNode(true)
    pHeader.querySelector('h1').textContent = product.name

    /*const categories = product.category
    for(let i = categories.length-1; i >= 0; i--) {

    }*/
    pHeader.querySelector('h2').textContent = product.category[1].title

    section2.appendChild(pHeader)
    for(let i = 0; i<5; i++) {
        const star = document.getElementById('template-star').content.cloneNode(true)
        if (i >= Math.floor(details.average)) {
            star.querySelector('i').style.color = '#D8D8D8'
        }
        document.querySelector('#product-header #product-rating').appendChild(star)
    }

    const description = document.getElementById('template-product-description').content.cloneNode(true)
    description.querySelector('p').textContent = product.description
    section2.appendChild(description)

    const actions = document.getElementById('template-product-actions').content.cloneNode(true)
    section2.appendChild(actions)

    // add reviews stats
    const reviewSection = document.querySelector('.reviews-section')
    let reviewsDetails = document.getElementById('template-reviews-details').content.cloneNode(true)
    reviewSection.appendChild(reviewsDetails)
    reviewsDetails = document.querySelector('#reviews-details')

    for(let i=0; i<5; i++) {
        let star = document.getElementById('template-star').content.cloneNode(true)
        if (i >= Math.floor(details.average)) {
            star.querySelector('i').style.color = '#D8D8D8'
        }
        reviewsDetails.querySelector('#avg-stars-wrapper').appendChild(star)
    }
    reviewsDetails.querySelector('.rating-avg').textContent = details.average
    reviewsDetails.querySelector('#rating-avg h2').textContent = `(${details.count} reviews)`

    const distribution = reviewsDetails.querySelector('#rating-distribution')
    for(let i=0; i<5; i++) {
        const data = details.list[i]

        const type = document.getElementById('template-distribution-type').content.cloneNode(true)
        type.querySelector('h2').style.gridRow = `${i+1}`
        type.querySelector('h2').textContent = `(${data.title})`
        distribution.querySelector('#rating-types').appendChild(type)

        const main = document.querySelector('#template-distribution-main').content.cloneNode(true)
        distribution.querySelector('#rating-main').appendChild(main)

        const percent = (data.count / details.count) * 100
        const width = Math.floor((percent * distribution.querySelectorAll('.outer')[i].getBoundingClientRect().width) / 100)
        distribution.querySelectorAll('.inner')[i].style.width = `${width}px`

        const count = document.querySelector('#template-distribution-count').content.cloneNode(true)
        count.querySelector('h2').style.gridRow = `${i+1}`
        count.querySelector('h2').textContent = `(${data.count})`
        distribution.querySelector('#rating-count').appendChild(count)
    }

    // add filters
    const filters = document.querySelector('#template-filters').content.cloneNode(true)
    reviewSection.appendChild(filters)

    // add reviews
    for(let i=0; i<reviews.length; i++) {
        const data = reviews[i]
        const template = document.getElementById('template-review').content.cloneNode(true)

        template.querySelector('.author-name').textContent = data.author
        template.querySelector('.posted-on').textContent = data.date
        template.querySelector('.review-title').textContent = data.title
        for(let j = 0; j<5; j++) {
            const star = document.querySelector('#template-star').content.cloneNode(true)
            if (j >= data.rating) {
                star.querySelector('i').style.color = '#D8D8D8'
            }
            template.querySelector('.review-stars').appendChild(star)
        }
        template.querySelector('.review-text').textContent = data.description
        reviewSection.appendChild(template)
    }

    // adjust stuff on resize
    $(window).on('resize', () => {
        for(let i=0; i<5; i++) {
            const data = details.list[i]
            const percent = (data.count / details.count) * 100
            const width = Math.floor((percent * distribution.querySelectorAll('.outer')[i].getBoundingClientRect().width) / 100)
            distribution.querySelectorAll('.inner')[i].style.width = `${width}px`
        }
    })

    $('.pic-main').click((e) => {
        if(window.innerWidth <= 768) {
            return;
        }

        const preview = $('#preview')
        preview.css('display', 'flex')
        let imgPath = e.target.style.backgroundImage
        imgPath = imgPath.substring(5, imgPath.length-2)
        const img = document.querySelector('#preview img')
        img.setAttribute('src', imgPath)
    })

    $('#exit-preview').click(() => {
        $('#preview').css('display', 'none')
    })
})
