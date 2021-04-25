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

    let reviewSection = document.getElementById('template-reviews-section').content.cloneNode(true)
    document.body.appendChild(reviewSection)
    reviewSection = document.querySelector('.reviews-section')

    let reviewsDetails = document.getElementById('template-reviews-details').content.cloneNode(true)
    reviewSection.appendChild(reviewsDetails)
    reviewsDetails = document.querySelector('#reviews-details')

    for(let i=0; i<5; i++) {
        let star = document.getElementById('template-star').content.cloneNode(true)
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

    for(let i=0; i<reviews.length; i++) {

    }

    $(window).on('resize', () => {
        for(let i=0; i<5; i++) {
            const data = details.list[i]
            const percent = (data.count / details.count) * 100
            const width = Math.floor((percent * distribution.querySelectorAll('.outer')[i].getBoundingClientRect().width) / 100)
            distribution.querySelectorAll('.inner')[i].style.width = `${width}px`
        }
    })
})
