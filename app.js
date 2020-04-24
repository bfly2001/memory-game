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
var disinfectantSupply = document.querySelector('#rect16')
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

//create loser board
function loserBoard() {
    for(let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', 'images/virus.png')
        grid.appendChild(card)
    }
}

//check for matches
function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
        document.getElementById("screen").textContent="Good job!";
        cards[optionOneId].setAttribute('src', 'images/clean.png')
        cards[optionTwoId].setAttribute('src', 'images/clean.png')
        cardsWon.push(cardsChosen)
    } else {
        document.getElementById("screen").textContent="Gotta keep cleaning!";
        cards[optionOneId].setAttribute('src', 'images/pandemic.png')
        cards[optionTwoId].setAttribute('src', 'images/pandemic.png')
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
    const alarmSound = new Audio('audio/alarmfx.wav')
    flipSound.play()
    disinfectantSupply.style.fillOpacity = disinfectantSupply.style.fillOpacity - .10
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
    if (disinfectantSupply.style.fillOpacity < 0) {
        alarmSound.play()
        resultDisplay.textContent = 'Sorry! Your supply ran out. Try again.'
        document.getElementById("screen").textContent="OH NO! SUPPLY DEPLETED!"
        document.getElementById("screen").style.backgroundColor="red"
        loserBoard()
    }
}


createBoard()

})