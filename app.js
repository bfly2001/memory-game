document.addEventListener('DOMContentLoaded', () => {

//card options
const cardArray = [
    {
        name: 'microscope',
        img: 'images/microscope.png'
    },
    {
        name: 'microscope',
        img: 'images/microscope.png'
    },
    {
        name: 'lung',
        img: 'images/lung.png'
    },
    {
        name: 'lung',
        img: 'images/lung.png'
    },
    {
        name: 'mask',
        img: 'images/mask.png'
    },
    {
        name: 'mask',
        img: 'images/mask.png'
    },
    {
        name: 'virus',
        img: 'images/virus.png'
    },
    {
        name: 'virus',
        img: 'images/virus.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
var cardsChosen = []
var cardsChosenId = []
var cardsWon = []

//create your board
function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', 'images/pandemic.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
}

//check for matches
function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match')
        cards[optionOneId].setAttribute('src', 'images/clean.png')
        cards[optionTwoId].setAttribute('src', 'images/clean.png')
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/pandemic.png')
        cards[optionTwoId].setAttribute('src', 'images/pandemic.png')
        alert('Sorry, try again')  
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
    }
}

//flip your card
function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    const flipSound = new Audio('audio/sprayfx.wav') //SFX Recorded: Mike Koenig
    flipSound.play()
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}


createBoard()

})