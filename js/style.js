const ancients = document.querySelector('.ancients');
const ancientsItem = document.querySelectorAll('.ancients__item');
const levels = document.querySelector('.levels');
const levelsItems = document.querySelectorAll('.levels__item');
const btn = document.querySelector('.button');
const cards = document.querySelector('.cards__wrap');

ancients.addEventListener('click', function(event){
    if(event.target.classList.contains('ancients__img')){
        for(let item of ancientsItem){
            if(item !== event.target.parentElement){
                item.classList.remove('_active');
            }
        }
        event.target.parentElement.classList.toggle('_active');
    }
})

levels.addEventListener('click', function(event){
    if(event.target.classList.contains('levels__item')){
        for(let item of levelsItems){
            if(item !== event.target){
                item.classList.remove('_active');
            }
        }
        event.target.classList.toggle('_active');
    }
})

btn.addEventListener('click', function(event){
    cards.style.display = 'block';
    btn.style.display = 'none';
})