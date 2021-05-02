const product = JSON.parse(localStorage.getItem('product'))
apiUrl = 'https://unique-fragrant-hospital.glitch.me/api'

async function getReviews() {
    try {
        return await $.get(`${apiUrl}/review/filter/${product.id}`)
    }
    catch(err) {
        console.log(err)
    }
}

async function getReviewStats() {
    try {
        return await $.get(`${apiUrl}/review/stats/${product.id}`)
    }
    catch(err) {
        console.log(err)
    }
}

async function createReview(request) {
    try {
        return await $.ajax({
            url: `${apiUrl}/review/new`,
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

const evCartUpdate = new Event('update-cart')

$(document).ready(() => {
    console.log('DOM fully loaded')

    // set product details

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
    pHeader.querySelector('h2').textContent = product.categories[0].name

    section2.appendChild(pHeader)
    getReviewStats().then((details) => {
        for(let i = 0; i<5; i++) {
            const star = document.getElementById('template-star').content.cloneNode(true)
            if (i >= Math.floor(details.average)) {
                star.querySelector('i').style.color = '#D8D8D8'
            }
            document.querySelector('#product-header #product-rating').appendChild(star)
        }
    })

    const description = document.getElementById('template-product-description').content.cloneNode(true)
    description.querySelector('p').textContent = product.description
    section2.appendChild(description)

    const actions = document.getElementById('template-product-actions').content.cloneNode(true)
    section2.appendChild(actions)

    $(document).on('load-reviews', () => {
        // add reviews stats
        const reviewSection = document.querySelector('.reviews-section')
        $(reviewSection).empty()
        reviewSection.appendChild($('#template-reviews-section-header')[0].content.cloneNode(true))
        getReviewStats().then((details) => {
            // add rating stats (avg, distribution, etc)
            let reviewsDetails = document.getElementById('template-reviews-details').content.cloneNode(true)
            reviewSection.appendChild(reviewsDetails)
            reviewsDetails = document.querySelector('#reviews-details')

            // add ratings average/count
            for(let i = 0; i<5; i++) {
                const star = document.getElementById('template-star').content.cloneNode(true)
                if (i >= Math.floor(details.average)) {
                    star.querySelector('i').style.color = '#D8D8D8'
                }
                document.querySelector('#avg-stars-wrapper').appendChild(star)
            }
            reviewsDetails.querySelector('.rating-avg').textContent = details.average
            reviewsDetails.querySelector('#rating-avg h2').textContent = `(${details.count} reviews)`

            // add rating distribution between 1-5 stars
            const distribution = reviewsDetails.querySelector('#rating-distribution')
            for(let i=0; i<5; i++) {
                const data = details.distribution[i]

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

            // add new-review form
            const reviewForm = document.querySelector('#template-add-review').content.cloneNode(true)
            reviewSection.appendChild(reviewForm)

            // event handler for submit-review button click
            const btnSubmitReview = document.querySelector('#add-review #submit')
            btnSubmitReview.addEventListener('click', () => {
                const request = {}
                request.rating = $('#input-rating')[0].valueAsNumber
                request.author = $('#input-author')[0].value
                request.title = $('#input-title')[0].value
                request.description = $('#input-review')[0].value
                request.furnitureId = product.id
                createReview(request).then((res) => {
                    console.log(res)
                    document.dispatchEvent(new Event('load-reviews'))
                    window.scrollTo(0, $('.reviews-section')[0].offsetTop - 150)
                })
            })

            // event handler for cancel-review button click
            $('#add-review #cancel').on('click', () => {
                $('#input-rating')[0].valueAsNumber = 1
                $('#input-author')[0].value = ''
                $('#input-title')[0].value = ''
                $('#input-review')[0].value = ''

                $('#add-review').css('display', 'none')
                window.scrollTo(0, $('.reviews-section')[0].offsetTop - 150)
            })

            // event handler for add-new-review button click
            const btnAddReview = document.querySelector('.btn-review')
            btnAddReview.addEventListener('click', () => {
                const reviewForm = $('#add-review');
                reviewForm.css('display', 'flex')
                window.scrollTo(0, reviewForm[0].offsetTop - 150)
            })

            /* add filters
            const filters = document.querySelector('#template-filters').content.cloneNode(true)
            reviewSection.appendChild(filters)*/

            //add reviews
            getReviews().then((res) => {
                const reviews = Array.from(res)
                reviews.sort((a, b) => {
                    return b.id-a.id
                })
                for(let i=0; i<reviews.length; i++) {
                    const data = reviews[i]
                    const template = document.getElementById('template-review').content.cloneNode(true)

                    template.querySelector('.author-name').textContent = data.author
                    template.querySelector('.posted-on').textContent = `${data.postedOn}`.split('T')[0]
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
            })
        })
    })
    document.dispatchEvent(new Event('load-reviews'))

    // adjust stuff on resize
    $(window).on('resize', () => {
        getReviewStats().then((details) => {
            const distribution = $('#rating-distribution')[0]
            for(let i=0; i<5; i++) {
                const data = details.distribution[i]
                const percent = (data.count / details.count) * 100
                const width = Math.floor((percent * distribution.querySelectorAll('.outer')[i].getBoundingClientRect().width) / 100)
                distribution.querySelectorAll('.inner')[i].style.width = `${width}px`
            }
        })
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

    $('.btn-cart').on('click', () => {
        let cart = new Map(JSON.parse(localStorage.getItem('cart')))
        if(!cart) {
            cart = new Map()
        }
        cart.set(JSON.stringify(product), cart.has(JSON.stringify(product)) ? cart.get(JSON.stringify(product))+1 : 1)
        localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())))
        document.dispatchEvent(evCartUpdate)
    })

    $('#exit-preview').click(() => {
        $('#preview').css('display', 'none')
    })
})
