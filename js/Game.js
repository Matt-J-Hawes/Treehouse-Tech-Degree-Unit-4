/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Matt Hawes
 * Game.js */
 class Game {

 	   constructor(){
 	   	   this.missed = 0;
 	   	   this.phrases = this.createPhrases()
 	   	   this.activePhrase = null
 	   }

		/*********************************************************************
		* Creates phrases for use in game
		* @return {array} An array of phrases that could be used in the game
		*********************************************************************/

 	   createPhrases(){
        const phrase = [
          new Phrase("Im the king of the world"),
          new Phrase("They call it a royale with cheese"),
          new Phrase("Wax on Wax off"),
          new Phrase("My precious"),
          new Phrase("Good morning Vietnam")
            ]
         return phrase
 	   }

 	   /***********************************************************************
		* Selects random phrase from phrases property
		* @return {Object} Phrase object chosen to be used
		***********************************************************************/

 	   getRandomPhrase(){
 	   	let randomPhrase = Math.floor(Math.random() * this.phrases.length)
 	   	let retrievePhrase = this.phrases[randomPhrase]
 	   	return retrievePhrase
 	   }

 	    /**********************************************************************
		* Begins game by selecting a random phrase and displaying it to user
		***********************************************************************/

 	   startGame(){
        const overLay = document.getElementById('overlay')
        overLay.style.display = "none"
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()

 	   }

		/**********************************************************************
		* Checks for winning move
		* @return {boolean} True if game has been won, false if game wasn't won
		***********************************************************************/

		checkForWin(){
			const ul = document.querySelector("ul")
			if(ul.innerHTML.includes(`<li class="letter hide"`)){
			return false}		
			else{return true}
		}

		/***********************************************************************
		* Increases the value of the missed property
		* Removes a life from the scoreboard
		* Checks if player has remaining lives and ends game if player is out
		************************************************************************/

	    removeLife(){	    	
	    	let li = document.querySelectorAll('#scoreboard img')	    		
	    	   this.missed ++
			if(this.missed < 5){
				li[5 - this.missed].src = "images/lostHeart.png"}
			else if(this.missed === 5){
				this.gameOver()
			}
		}

		/***********************************************************************
		* Displays game over message
		* @param {boolean} gameWon - Whether or not the user won the game
		***********************************************************************/

         gameOver(){
     	    const mainScreen = document.getElementById('overlay')
            mainScreen.style.display = "inherit"
            const h1 = document.getElementById('game-over-message')                             
            if(this.missed === 5){                 
            	h1.innerHTML = `Sorry ${nameInput.value}, you lost! Better luck next time.`
            	button.innerHTML = "Try again"
            	mainScreen.className = 'loss'
            	warningDiv.style.display = "none"
                game.resetGame()}            	
            else if(this.missed < 5){
            	h1.innerHTML = `Congratulations ${nameInput.value}, You won! The quote was
            	<br><p class= "end-quote">"${game.activePhrase.phrase.toUpperCase()}"</p>`
            	button.innerHTML = "Play again"          	
            	mainScreen.className = 'win'
            	warningDiv.style.display = "none"
            	game.resetGame()
            }
	     }

		/***********************************************************************
		* Handles onscreen keyboard button clicks
		* @param (HTMLButtonElement) button - The clicked button element
		************************************************************************/

         handleInteraction(buttonKey){
         	if(buttonKey){
         		buttonKey.disabled = true  	
			if(game.activePhrase.checkLetter(buttonKey.innerHTML)){
				buttonKey.className = "chosen";
				game.activePhrase.showMatchedLetter(buttonKey.innerHTML)
			if(game.checkForWin()){                  	   	 
				game.gameOver()}}
		    else{buttonKey.className = "wrong";
				game.removeLife()}
		    }}
		
        /***********************************************************************
		* Handles the reset of the game when the player wins / loses
		* Resets board back to its original state
		************************************************************************/
          
          resetGame(){
          	button.addEventListener("click", function(){
			let li = document.querySelectorAll('#scoreboard img')
			for(let i = 0; i < li.length; i++){
				li[i].src = "images/liveHeart.png"}
            const wrongButton = document.querySelectorAll('.wrong')
            for(let i = 0; i < wrongButton.length; i++){
                  wrongButton[i].className = "key"
                  wrongButton[i].disabled = false}
            const chosenButton = document.querySelectorAll('.chosen')
            for(let i = 0; i < chosenButton.length; i++){
            	  chosenButton[i].className = "key"
            	  chosenButton[i].disabled = false}          
            const ul = document.querySelector("ul")
            const list = ul.querySelectorAll("li")
            for(let x = 0; x < list.length; x++){
		          ul.removeChild(list[x])}
		          game.activePhrase.addPhraseToDisplay() })          								
			}
		}