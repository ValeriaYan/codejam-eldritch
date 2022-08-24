const ancients = document.querySelector('.ancients');
const ancientsItem = document.querySelectorAll('.ancients__item');
const ancientsLoupe = document.querySelectorAll('.ancients__loupe');
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
        event.target.parentElement.classList.add('_active');
    }
})

let isScale = false;
ancients.addEventListener('click', function(event){
    if(event.target.classList.contains('ancients__loupe')){
        if(isScale){
            event.target.parentElement.style = '';
            isScale = false;
        }else{
            for(let item of ancientsLoupe){
                if(item !== event.target){
                    item.parentElement.style = '';
                }
            }
            event.target.parentElement.style.transform = 'scale(1.8)';
            event.target.parentElement.style.transformOrigin = 'top left';
            event.target.parentElement.style.zIndex = '35';
            isScale = true;
        }
    }
})

document.addEventListener('click', function(event){
    if(!event.target.classList.contains('ancients__loupe')){
        for(let item of ancientsItem){
            item.style = '';
            isScale = false;
        }
    }
})

levels.addEventListener('click', function(event){
    if(event.target.classList.contains('levels__item')){
        for(let item of levelsItems){
            if(item !== event.target){
                item.classList.remove('_active');
            }
        }
        event.target.classList.add('_active');
    }
})

const cardsDeck = document.querySelector('.cards__deck');
const cardsDeckImg = document.querySelector('.cards__deck-img');
const openCard = document.querySelector('.cards__open-card');
const openCardImg = document.querySelector('.cards__open-card-img');

function removeCardOpenImg(){
    openCardImg.style.display = 'none';
}


btn.addEventListener('click', function(event){
    cardsDeckImg.style.display = 'block';
    openCardImg.style.display = 'none';
    cards.style.display = 'block';
    btn.style.display = 'none';
})