$(document).ready(function (){
    const products = [
        {
            name: 'Холна гарнитура BOSNA',
            thumbnail: 'assets/divan1.jpg'
        },
        {
            name: 'Холна гарнитура DESTAN',
            thumbnail: 'assets/divan2.jpg'
        },
        {
            name: 'Холна гарнитура LUXURY',
            thumbnail: 'assets/divan3.jpg'
        },
        {
            name: 'Холна гарнитура ESH N SIQUE',
            thumbnail: 'assets/02.jpg'
        }]
    const template = document.querySelector('#item')
    for(let i=0; i<products.length; i++){
        const clone = template.content.cloneNode(true)
        clone.querySelector('.item-footer h2').textContent = products[i].name
        clone.querySelector('.item-thumb').style.setProperty('background-image', `url("${products[i].thumbnail}")`)
        document.querySelector('.content').appendChild(clone);
    }
})