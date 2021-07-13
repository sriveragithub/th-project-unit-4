/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0
        this.phrases = this.createPhrases()
        this.activePhrase = null
    }

    /*
        Creates phrases for use in game
        @return {array} An array of phrases that could be used in the game
    */

    createPhrases() {
        let phraseArr = []

        function pushIntoArr(str) {
            phraseArr.push(new Phrase(str))
        }
        
        pushIntoArr('Heres looking at you kid')
        pushIntoArr('Luke I am your father')
        pushIntoArr('You cant handle the truth')
        pushIntoArr('Frankly my dear I dont give a damn')
        pushIntoArr('May the force be with you')
        
        return phraseArr
    }

    /*
        Selects random phrase from phrases property
        @return {Object} Phrase object chosen to be used
    */

    getRandomPhrase() {
        let randomNumber = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[randomNumber]
    }

    /*
        Begins game by selecting a random phrase and displaying it to user
    */

    startGame() {
        this.resetBoard()

        document.getElementById('overlay').style.display = 'none'
        const selectedPhrase = this.getRandomPhrase()
        this.activePhrase = selectedPhrase
        selectedPhrase.addPhraseToDisplay()
    };

    /*
        This function resets the board and is called each time a game starts
    */

    resetBoard() {
        const phraseID = document.getElementById('phrase')
        let tries = document.getElementsByClassName('tries')
        while (phraseID.firstElementChild.firstChild) {
            phraseID.firstElementChild.removeChild(phraseID.firstElementChild.firstChild)
        }
        for (let i = 0; i < tries.length; i++) {
            tries[i].firstElementChild.src = 'images/liveHeart.png'
        }
    }

    /*
        Interaction handler that is called by app.js to setup all game interactions
    */

    handleInteraction() {
        let keys = document.getElementsByClassName('key')
        const clickHandler = (e) => {
            this.activePhrase.checkLetter(e.target.innerHTML)
            if (this.activePhrase.checkLetter(e.target.innerHTML) === false) {
                e.target.className = 'wrong'
                e.target.removeEventListener('click', clickHandler)
                this.removeLife()
            } else if (this.activePhrase.checkLetter(e.target.innerHTML) === true) {
                e.target.className = 'chosen'
                e.target.removeEventListener('click', clickHandler)
            }
            this.checkForWin()
        }
        Array.from(keys).forEach(key => key.addEventListener('click', clickHandler))
    }

    /*
        Checks for winning move
        @return {boolean} True if game has been won, false if game wasn't won
    */

    checkForWin() {
        const div = document.getElementById('phrase')
        const phraseColl = Array.from(div.firstElementChild.children)

        let hiddenLetters = phraseColl.filter(phrase => phrase.className === `hide letter ${phrase.innerHTML}`)
        if (hiddenLetters.length === 0) {
            this.gameOver(true)
        }
    }

    /*
        Increases the value of the missed property
        Removes a life from the scoreboard
        Checks if player has remaining lives and ends game if player is out
    */

    removeLife() {
        this.missed++
        let tries = document.getElementsByClassName('tries')
        for (let i = 0; i < this.missed; i++) {
            tries[i].firstElementChild.src = 'images/lostHeart.png'
        }
        if (this.missed === 5) {
            this.gameOver(false)
        }
    }

    /*
        Displays game over message
        @param {boolean} gameWon - Whether or not the user won the game
    */

    gameOver(gameWon) {
        const overlay = document.getElementById('overlay')
        const message = document.getElementById('game-over-message')
        let keyRows = document.getElementsByClassName('keyrow')
        if (gameWon === false) {
            document.getElementById('overlay').style.display = 'flex'
            message.innerHTML = "You ran out of lives. Try again!"
            overlay.className = 'lose'
            this.missed = 0

            // Chaining array methods to reset key classes
            Array.from(keyRows)
                .forEach(key => Array.from(key.children)
                .forEach(k => k.className = 'key'))
        } else {
            document.getElementById('overlay').style.display = 'flex'
            message.innerHTML = "Nice job! You win!"
            overlay.className = 'win'
            this.missed = 0

            // Chaining array methods to reset key classes
            Array.from(keyRows)
                .forEach(key => Array.from(key.children)
                .forEach(k => k.className = 'key'))
        }
    }
}