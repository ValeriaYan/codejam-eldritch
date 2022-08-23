import Ancients from '../data/ancients.js';
import Green from '../data/mythicCards/green/index.js'
import Blue from '../data/mythicCards/blue/index.js'
import Brown from '../data/mythicCards/brown/index.js'

let activeAncient = Ancients[0];
let customDeck = {
    green: {
        quantity: 0,
        cards: [],
    },
    brown: {
        quantity: 0,
        cards: [],
    },
    blue: {
        quantity: 0,
        cards: [],
    }
};

let activeLevel = '';

const ancients = document.querySelector('.ancients');
const levels = document.querySelector('.levels');
const button = document.querySelector('.button');

function getRandomNum(max){
    return Math.floor((Math.random() * max));
}

function setActiveAncient(){
    let activeItem = ancients.querySelector('.ancients__item._active').dataset.ancient;
    activeAncient = Ancients.find(item => item.name == activeItem);
}

function setActiveLevel(){
    activeLevel = levels.querySelector('.levels__item._active').dataset.level;
}

ancients.addEventListener('click', function(){
    setActiveAncient();
    setQuantityCardsForCustomDeck();
});

levels.addEventListener('click', setActiveLevel);

function setQuantityCardsForCustomDeck(){
    customDeck.green.quantity = activeAncient.firstStage.greenCards + activeAncient.secondStage.greenCards + activeAncient.thirdStage.greenCards;
    customDeck.brown.quantity = activeAncient.firstStage.brownCards + activeAncient.secondStage.brownCards + activeAncient.thirdStage.brownCards;
    customDeck.blue.quantity = activeAncient.firstStage.blueCards + activeAncient.secondStage.blueCards + activeAncient.thirdStage.blueCards;
}

function selectCards(cardsData, colorCards, arrayOptions, additionalOption = ''){
    let cardsForSelection = []; 
    for(let i = 0; i < arrayOptions.length; i++){
        let temp =  cardsData.filter(elem => elem.difficulty == arrayOptions[i]);
        for(let elem of temp){
            cardsForSelection.push(elem);
        }
    }
    for(let i = 0; i < customDeck[colorCards].quantity; i++){
        if(cardsForSelection.length == 0){
            break;
        }
        let randomNum = getRandomNum(cardsForSelection.length);
        customDeck[colorCards].cards.push(cardsForSelection[randomNum]);
        cardsForSelection.splice(randomNum, 1);
    }

    let dif = customDeck[colorCards].quantity - customDeck[colorCards].cards.length;
    if(additionalOption !== '' && dif !== 0){
        let additionalCardsForSelection = cardsData.filter(elem => elem.difficulty == additionalOption);
        for(let i = 0; i < dif; i++){
            let randomNum = getRandomNum(additionalCardsForSelection.length);
            customDeck[colorCards].cards.push(additionalCardsForSelection[randomNum]);
            additionalCardsForSelection.splice(randomNum, 1);
        }
    }

    shuffleArray(customDeck[colorCards].cards);
}

function selectCardsVeryEasy(){
    selectCards(Green, 'green', ['easy'], 'normal');
    selectCards(Blue, 'blue', ['easy'], 'normal');
    selectCards(Brown, 'brown', ['easy'], 'normal');
}

function selectCardsEasy(){
    selectCards(Green, 'green', ['normal', 'easy']);
    selectCards(Blue, 'blue', ['normal', 'easy']);
    selectCards(Brown, 'brown', ['normal', 'easy']);
}

function selectCardsNormal(){
    selectCards(Green, 'green', ['normal', 'easy', 'hard']);
    selectCards(Blue, 'blue', ['normal', 'easy', 'hard']);
    selectCards(Brown, 'brown', ['normal', 'easy', 'hard']);
}

function selectCardsHard(){
    selectCards(Green, 'green', ['normal', 'hard']);
    selectCards(Blue, 'blue', ['normal', 'hard']);
    selectCards(Brown, 'brown', ['normal', 'hard']);
}

function selectCardsVeryHard(){
    selectCards(Green, 'green', ['hard'], 'normal');
    selectCards(Blue, 'blue', ['hard'], 'normal');
    selectCards(Brown, 'brown', ['hard'], 'normal');
}

function selectCardsDependingOnLevel(){
    if(activeLevel == 'very easy') {selectCardsVeryEasy();}
    if(activeLevel == 'easy') {selectCardsEasy();}
    if(activeLevel == 'normal') {selectCardsNormal();}
    if(activeLevel == 'hard') {selectCardsHard();}
    if(activeLevel == 'very hard') {selectCardsVeryHard();}
}

function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--){
        let randomNum = getRandomNum(array.length);
        let temp = array[i];
        
        array[i] =  array[randomNum];
        array[randomNum] = temp;
    }
}

function deleteCardFromCustomDeck(colorCard, number){
    customDeck[colorCard].cards.splice(number, 1);
    customDeck[colorCard].quantity--;
}

let stage1 = {};
let stage2 = {};
let stage3 = {};

function selectCardsForStage(stage){
    for(let i = 0; i < stage.numberGreen; i++){
        let randomNum = getRandomNum(customDeck.green.quantity);
        stage.cards.push(customDeck.green.cards[randomNum]);
        deleteCardFromCustomDeck('green', randomNum);
    }
    for(let i = 0; i < stage.numberBrown; i++){
        let randomNum = getRandomNum(customDeck.brown.quantity);
        stage.cards.push(customDeck.brown.cards[randomNum]);
        deleteCardFromCustomDeck('brown', randomNum);
    }
    for(let i = 0; i < stage.numberBlue; i++){
        let randomNum = getRandomNum(customDeck.blue.quantity);
        stage.cards.push(customDeck.blue.cards[randomNum]);
        deleteCardFromCustomDeck('blue', randomNum);
    }
    shuffleArray(stage.cards);
}


function fillStagesDecks(){
    stage1 = {
        numberGreen: activeAncient.firstStage.greenCards,
        numberBrown: activeAncient.firstStage.brownCards,
        numberBlue: activeAncient.firstStage.blueCards,
        cards: [],
    }
    
    stage2 = {
        numberGreen: activeAncient.secondStage.greenCards,
        numberBrown: activeAncient.secondStage.brownCards,
        numberBlue: activeAncient.secondStage.blueCards,
        cards: [],
    }

    stage3 = {
        numberGreen: activeAncient.thirdStage.greenCards,
        numberBrown: activeAncient.thirdStage.brownCards,
        numberBlue: activeAncient.thirdStage.blueCards,
        cards: [],
    }

    selectCardsForStage(stage1);
    selectCardsForStage(stage2);
    selectCardsForStage(stage3);
}

let finalDeck = [];

function fillFinalDeck(){
    for(let card of stage3.cards){
        finalDeck.push(card);
    }
    for(let card of stage2.cards){
        finalDeck.push(card);
    }
    for(let card of stage1.cards){
        finalDeck.push(card);
    }
}


button.addEventListener('click', function(){
    selectCardsDependingOnLevel();
    fillStagesDecks();
    fillFinalDeck();
})