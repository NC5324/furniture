const apiUrl = 'http://localhost:3000/api'

async function getAllCategories() {
    try {
        return await $.get(`${apiUrl}/category/all`)
    }
    catch(err) {
        console.log(err)
    }
}

async function filterFurniture(perPage, currentPage, categories) {
    const request = {
        perPage: perPage,
        currentPage: currentPage,
        categories: categories
    }
    try {
        return await $.ajax({
            url: `${apiUrl}/furniture/test`,
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

async function getFurniture(id) {
    try {
        return await $.get(`${apiUrl}/furniture/${id}`)
    }
    catch(err) {
        console.log(err)
    }
}

// self-explanatory, moved into a function for better code readability
function createCheckBox(ctgId) {
    const check = document.createElement('input')
    check.setAttribute('id', 'ctg-'+ctgId)
    check.setAttribute('type', 'checkbox')
    check.style.marginRight = '10px'

    return check
}

$(document).ready(() => {
    console.log('Document is fully loaded.')

    let selected = []

    // populate the browsing section when there is a change in selected filters
    //const filterEvent = new CustomEvent('filter', { selected: [] })
    document.addEventListener('filter', (ev) => {
        filterFurniture(999, 1, ev.detail).then((res) => {
            const items = Array.from(res.rows)
            const template = document.querySelector('#template-item')
            $('.browse').empty()
            for(let i=0; i<items.length; i++) {
                const product = items[i]
                const item = template.content.cloneNode(true)
                item.querySelector('.item').setAttribute('data-id', `${product.id}`)
                item.querySelector('.item').style.backgroundImage = `url("${product.thumbnail}")`
                item.querySelector('.item-title').textContent = product.name
                const rating = Math.floor(Math.random() * (5 - 1)) + 1
                for(let j = 0; j<5; j++) {
                    const star = document.querySelector('#template-star').content.cloneNode(true)
                    if (j >= rating) {
                        star.querySelector('i').style.color = '#D8D8D8'
                    }
                    item.querySelector('.item-rating').appendChild(star)
                }
                item.querySelector('.item-price').textContent = `${product.price} лв.`
                document.querySelector('.browse').appendChild(item)
            }
            document.dispatchEvent(new Event('items-created'))
            console.log(Array.from($('.item')))
        })
    })

    // script for generating nested categories using the category template
    getAllCategories().then((res) => {
        const categories = Array.from(res)
        selected = categories.map(x => x.id)
        const maxLevel = Math.max.apply(Math, categories.map(x => x.level))
        for (let level = 0; level <= maxLevel; level++) {
            const ctgs = categories.filter(category => category.level === level)
            for (let ctg = 0; ctg < ctgs.length; ctg++) {
                const container = !ctgs[ctg].parentId ?
                    document.querySelector('#categories') :
                    document.querySelector(`details[data-id='${ctgs[ctg].parentId}']`)

                const clone = document.querySelector('#category').content.cloneNode(true)
                clone.querySelector('details').setAttribute('data-id', ctgs[ctg].id + '')
                clone.querySelector('details').style.paddingLeft = level > 0 ? '30px' : ''
                clone.querySelector('details').style.marginLeft = level > 0 ? '' : '-20px'


                const summary = clone.querySelector('summary')
                const checkBox = createCheckBox(ctgs[ctg].id)

                // remove expand icons if no children categories
                const children = categories.filter(x => x.level > ctgs[ctg].level && x.parentId === ctgs[ctg].id)
                if (children.length === 0) {
                    clone.querySelector(`details[data-id="${ctgs[ctg].id}"] summary .test`).setAttribute('data-after-closed', '')
                    clone.querySelector(`details[data-id="${ctgs[ctg].id}"] summary .test`).setAttribute('data-after-open', '')
                }

                // select children categories on category selection
                // fire an event for filtering
                $(checkBox).change(() => {
                    children.forEach(x => {
                        const checkbox = $('#ctg-' + x.id)[0]
                        checkbox.checked = !checkbox.checked
                    })

                    selected = Array.from(document.querySelectorAll('input[type="checkbox"]'))
                        .filter(x => x.checked)
                        .map(x => Number(x.id.split('-')[1]))
                    if(selected.length === 0) {
                        getAllCategories().then((res) => {
                            const categories = Array.from(res)
                            const selected = categories.map(x => x.id)
                            document.dispatchEvent(new CustomEvent('filter', { detail: selected }))
                        })
                    } else {
                        document.dispatchEvent(new CustomEvent('filter', { detail: selected }))
                    }
                })

                const title = document.createTextNode(ctgs[ctg].name);
                summary.querySelector('.test').append(checkBox, title)
                container.appendChild(clone)
            }
        }
        // initialize browsing section
        document.dispatchEvent(new CustomEvent('filter', { detail: selected }))
    })

    const ctgId = Number(localStorage.getItem('category'))
    if(ctgId) {
        $('#ctg-'+ctgId).click()
    }

    $(document).on('items-created', () => {
        $('.item').on('click', (ev) => {
            const htmlEl = ev.currentTarget
            const id = htmlEl.getAttribute('data-id')
            console.log(htmlEl, id)

            getFurniture(id).then((product) => {
                localStorage.setItem('product', JSON.stringify(product))
                window.location.href = 'product.html'
            })
        })
    })
})
