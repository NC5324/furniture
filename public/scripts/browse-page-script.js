class Category {
    constructor(parentId, id, lvl, title) {
        this.parentId = parentId
        this.id = id
        this.lvl = lvl
        this.title = title
    }
}

// mock categories for testing purposes
const categories = [
    new Category(null, 1, 0, 'Холна гарнитура'),
    new Category(1, 2, 1, 'Дивани'),
    new Category(1, 3, 1, 'Фотьойли'),
    new Category(1, 4, 1, 'Холни маси'),
    new Category(2, 5, 2, 'Разтегателни дивани'),
    new Category(2, 6, 2, 'Ъглови дивани'),
    new Category(null, 7, 0, 'Спалня'),
    new Category(null, 8, 0, 'Кухня'),
    new Category(7, 9, 1, 'Легла'),
    new Category(7, 10, 1, 'Нощни шкафчета'),
    new Category(7, 11, 1, 'Ракли')
]

// mock products for testing purposes
const products = [
    {
        id: 0,
        name: 'Холна гарнитура BOSNA',
        description: 'Mn udobni mebeli, no malko skypi. Bacon ipsum dolor amet pastrami drumstick bacon beef cow cupim tri-tip short loin prosciutto porchetta brisket. Meatloaf sausage ham hock leberkas drumstick shankle brisket rump sirloin, turducken cow.\n',
        thumbnail: '../assets/divan1.jpg',
        category: 2
    },
    {
        id: 1,
        name: 'Холна гарнитура DESTAN',
        description: 'Mn udobni mebeli. Bacon ipsum dolor amet pastrami drumstick bacon beef cow cupim tri-tip short loin prosciutto porchetta brisket. Meatloaf sausage ham hock leberkas drumstick shankle brisket rump sirloin, turducken cow.',
        thumbnail: '../assets/divan2.jpg',
        category: 2
    },
    {
        id: 2,
        name: 'Холна гарнитура LUXURY',
        description: 'Mn skypi4ki mebeli bro. Bacon ipsum dolor amet pastrami drumstick bacon beef cow cupim tri-tip short loin prosciutto porchetta brisket. Meatloaf sausage ham hock leberkas drumstick shankle brisket rump sirloin, turducken cow.',
        thumbnail: '../assets/divan3.jpg',
        category: 2
    },
    {
        id: 3,
        name: 'Холна гарнитура ESH N SIQUE',
        description: 'Mn dobri mebeli bratan. Bacon ipsum dolor amet pastrami drumstick bacon beef cow cupim tri-tip short loin prosciutto porchetta brisket. Meatloaf sausage ham hock leberkas drumstick shankle brisket rump sirloin, turducken cow.',
        thumbnail: '../assets/02.jpg',
        category: 2
    },
    {
        id: 4,
        name: 'Легло',
        description: 'Mn dobro leglo. Bacon ipsum dolor amet pastrami drumstick bacon beef cow cupim tri-tip short loin prosciutto porchetta brisket. Meatloaf sausage ham hock leberkas drumstick shankle brisket rump sirloin, turducken cow.',
        thumbnail: '../assets/02.jpg',
        category: 9
    }]

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

    if(window.innerWidth > 900) {
        document.getElementById('ctg-menu').open = true
    }

    let selected = []
    let items = products

    // populate the browsing section when there is a change in selected filters
    const filterEvent = new Event('filter')
    document.addEventListener('filter', () => {
        $('.browse').empty()
        const template = document.querySelector('#item')
        for(let i=0; i<items.length; i++) {
            const clone = template.content.cloneNode(true)
            clone.querySelector('.item').setAttribute('data-id', `${items[i].id}`)
            clone.querySelector('.item-footer h2').textContent = items[i].name
            clone.querySelector('.item-thumb').style.setProperty('background-image', `url("./${items[i].thumbnail}")`)
            document.querySelector('.browse').appendChild(clone);
        }
    })

    // initialize browsing section
    document.dispatchEvent(filterEvent)

    // script for generating nested categories using the category template
    const maxLvl = Math.max.apply(Math, categories.map(x => x.lvl))
    for(let level = 0; level <= maxLvl; level++) {
        const ctgs = categories.filter(category => category.lvl === level)
        for(let ctg = 0; ctg < ctgs.length; ctg++) {
            const container = !ctgs[ctg].parentId ?
                document.querySelector('#categories') :
                document.querySelector(`details[data-id='${ctgs[ctg].parentId}']`)

            const clone = document.querySelector('#category').content.cloneNode(true)
            clone.querySelector('details').setAttribute('data-id', ctgs[ctg].id + '')
            clone.querySelector('details').style.paddingLeft = level > 0 ? '30px' : ''
            clone.querySelector('details').style.marginLeft  = level > 0 ? '' : '-20px'


            const summary = clone.querySelector('summary')
            const checkBox = createCheckBox(ctgs[ctg].id)

            // remove expand icons if no children categories
            const children = categories.filter(x => x.lvl > ctgs[ctg].lvl && x.parentId === ctgs[ctg].id)
            if(children.length === 0) {
                clone.querySelector(`details[data-id="${ctgs[ctg].id}"] summary .test`).setAttribute('data-after-closed', '')
                clone.querySelector(`details[data-id="${ctgs[ctg].id}"] summary .test`).setAttribute('data-after-open', '')
            }

            // select children categories on category selection
            // fire an event for filtering
            $(checkBox).change(() => {
                children.forEach(x => {
                    $('#ctg-' + x.id).click()
                })

                selected = Array.from(document.querySelectorAll('input[type="checkbox"]')).filter(x => x.checked).map(x => Number(x.id.split('-')[1]))
                items = selected.length === 0 ? products : products.filter(x => selected.includes(x.category))

                document.dispatchEvent(filterEvent)
            })

            const title = document.createTextNode(ctgs[ctg].title);
            summary.querySelector('.test').append(checkBox, title)
            container.appendChild(clone)
        }
    }

    const ctgId = Number(localStorage.getItem('category'))
    if(ctgId) {
        $('#ctg-'+ctgId).click()
    }

    $('.item').on('click', (e) => {
        let parent = $(e.target).parent()
        let id = parent.attr('data-id')
        while(!id) {
            parent = $(parent).parent()
            id = parent.attr('data-id')
        }
        let product = items.find(x => `${x.id}` === id)

        let temp = []
        let category = categories.find(x => x.id === product.category)
        console.log(category)
        while(category) {
            temp.push(category)
            category = categories.find(x => x.id === category.parentId)
        }
        product.category = temp

        localStorage.setItem('product', JSON.stringify(product))
        window.location.href = 'product.html'
    })
})
