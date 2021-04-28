class Carousel extends HTMLElement {
    constructor() {
        super();

        const carousel = document.createElement('div')
        carousel.setAttribute('class', 'carousel')

        const btnRight = document.createElement('div')
        btnRight.setAttribute('class', 'btn-r')

        const btnLeft = document.createElement('div')
        btnLeft.setAttribute('class', 'btn-l')

        const style = document.createElement('style')

        style.textContent = `
        .carousel {
            width: 100%;
            flex: 1 0 auto;
            background-color: #FF9100;

            display: flex;
            flex-direction: row;

            transition: background-color 0.5s ease-out;
        }
        
        .btn-l, .btn-r {
            background-color: #007A75;
            opacity: 0;
            width: 100px;
        }

        .btn-r {
            margin-left: auto;
        }

        .btn-l:hover, .btn-r:hover {
            opacity: 0.5;
        }
        `

        document.querySelector('.wrapper').appendChild(style);
        document.querySelector('.wrapper').appendChild(carousel)
        carousel.appendChild(btnLeft);
        carousel.appendChild(btnRight);
    }
}

customElements.define('nc-carousel', Carousel)
