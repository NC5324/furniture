$(document).ready(() => {

    $(document).on('update-cart', () => {
        const cartItems = document.querySelector('#cart-items')
        $(cartItems).empty()

        let cart = new Map(JSON.parse(localStorage.getItem('cart')))
        let index = 0
        cart.forEach((value, key) => {
            const product = JSON.parse(`${key}`)
            const cartItem = document.querySelector('#template-item').content.cloneNode(true)
            if(index > 0) {
                cartItem.querySelector('.cart-item').style.marginTop = '10px'
            }
            cartItem.querySelector('.cart-item').style.backgroundImage = `url("${product.thumbnail}")`
            cartItem.querySelector('.title .sik').textContent = product.name
            const rating = Math.floor(Math.random() * (5 - 1)) + 1
            for(let j = 0; j<5; j++) {
                const star = document.querySelector('#template-star').content.cloneNode(true)
                if (j >= rating) {
                    star.querySelector('i').style.color = '#D8D8D8'
                }
                cartItem.querySelector('.cart-item .stars').appendChild(star)
            }
            cartItem.querySelector('.cart-item-details > .cart-item-price').textContent = `${value} x ${product.price} лв.`

            const btnRemove = document.querySelector('#template-item-btn-remove').content.cloneNode(true)
            cartItem.querySelector('.cart-item').appendChild(btnRemove)

            const counter = document.querySelector('#template-cart-item-counter').content.cloneNode(true)
            counter.querySelector('.cart-item-counter').textContent = `${value}`
            cartItem.querySelector('.cart-item').appendChild(counter)

            cartItem.querySelector('.cart-item').setAttribute('data-kur', key)
            cartItems.appendChild(cartItem)
            index++
        })
        updateDetails()

        $('.cart-item-btn-remove').on('click', (e) => {
            const item = $(e.currentTarget).parent()[0]
            const parent = item.parentNode

            cart.delete(item.getAttribute('data-kur'))
            localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())))
            cart = new Map(JSON.parse(localStorage.getItem('cart')))
            updateDetails()

            item.remove()
        })


        function getTotalCount() {
            let total = 0
            Array.from(cart.values()).forEach(count => {
                total += count
            })
            return total
        }
        function getTotalPrice() {
            let sum = 0
            cart.forEach((value, key) => {
                const x = JSON.parse(`${key}`)
                sum += (x.price * value)
            })
            return sum
        }
        function updateDetails() {
            const cartDetails = document.querySelector('#cart-details')

            cartDetails.querySelectorAll('h2')[0].textContent = `Items in cart: ${getTotalCount()}`
            cartDetails.querySelectorAll('h2')[1].textContent = `Total price: ${getTotalPrice()} лв.`
        }

    })
    document.dispatchEvent(new Event('update-cart'))

    /*$(document).click((e) => {
        if(document.getElementById('cart').getBoundingClientRect().width > 1) {
            if(e.pageX > 400) {
                closeCart()
            }
        }
    })*/

    $('#btn-basket').click(() => {
        $('#cart').css('width', '425px')
        $('#cart-wrapper').css('width', 'calc(100% - 60px)')
        $('#preview').css('display', 'none')
    })

    $('#exit-cart').on('click', closeCart)

    function closeCart() {
        $('#cart').css('width', '0')
        $('#cart-wrapper').css('width', '0');
    }
})
