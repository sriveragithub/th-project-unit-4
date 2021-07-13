/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase()
    }

    addPhraseToDisplay() {
        const div = document.getElementById('phrase')
        const ul = document.createElement('ul')
        let phrase = [...this.phrase]
        phrase.forEach(phr => {
            if (phr === ' ') {
                let li = document.createElement('li')
                li.className = 'space'
                li.innerHTML = phr
                div.firstElementChild.append(li)
            } else {
                let li = document.createElement('li')
                li.className = `hide letter ${phr}`
                li.innerHTML = phr
                div.firstElementChild.append(li)
            }
        })
    }

    /*
        Checks if passed letter is in phrase
        @param (string) letter - Letter to check
    */

    checkLetter(letter) {
        let matchedElements = []
        let isMatch = false
        const div = document.getElementById('phrase')
        const phraseCol = Array.from(div.firstElementChild.children)
        phraseCol.forEach(phr => {
            if (letter === phr.innerHTML) {
                matchedElements.push(phr)
                isMatch = true
            }
        })
        this.showMatchedLetter(matchedElements);
        return isMatch
    }

    /*
        Displays passed letter on screen after a match is found
        @param (string) letter - Letter to display
    */

    showMatchedLetter(letters) {
        letters.forEach(letter => letter.className = `show letter ${letter.innerHTML}`)
    }
}