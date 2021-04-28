$(document).ready(() => {
    $(document).click((e) => {
        if(document.getElementById('cart').getBoundingClientRect().width > 1) {
            if(e.pageX > 400) {
                closeCart()
            }
        }
    })

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
