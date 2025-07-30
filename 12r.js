      /*
      Problems:
      1.  
      */

      let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
      };
      
      // Global flag to track confirmation mode
      let isResetConfirmVisible = false;

      let result;

      //Keeping the score showing even after the reload
      updateScoreElement();


      //Auto Play Button
      document.querySelector('.js-auto-play')
        .addEventListener('click', () => {
          autoPlay();
        });

      
      // Stop Auto Play function
      function stopAutoPlay() {
        if (isAutoPlaying) { 
          clearInterval(intervalID);
          isAutoPlaying = false;
          document.querySelector('.js-auto-play').textContent = `Auto Play`;
          document.querySelector('.js-auto-play').classList.remove('show-stop');

          resetButtonPackage();
        }
      }


      //Auto Play function
      let isAutoPlaying = false;
      let intervalID; 
      
      function autoPlay() {
        if (!isAutoPlaying) {
          intervalID = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;

          document.querySelector('.js-auto-play').textContent = `Stop`;
          document.querySelector('.js-auto-play').classList.add('show-stop');

          // If auto play is on, reset button will not be shown
          //document.querySelector('.js-reset-wrapper').innerHTML = '';
          resetButtonPackage();
        } else {
          // Key 'a' works as a toggle for auto play
          stopAutoPlay();
        }
      }


      // Move buttons
      document.querySelector('.js-rock-button')
        .addEventListener('click', () => {
          // If auto play is running, stop it before playing manually
          if (isAutoPlaying) {
            stopAutoPlay();
          }
          playGame('Rock');
          resetButtonPackage();
        });

      document.querySelector('.js-paper-button')
        .addEventListener('click', () => {
          // If auto play is running, stop it before playing manually
          if (isAutoPlaying) {
            stopAutoPlay();
          }
          playGame('Paper');
          resetButtonPackage();
        });

      document.querySelector('.js-scissors-button')
        .addEventListener('click', () => {
          // If auto play is running, stop it before playing manually
          if (isAutoPlaying) {
            stopAutoPlay();
          }
          playGame('Scissors');
          resetButtonPackage();
        });
      
      //Playing with buttons
      /*
      Adding event listeners to the body by the keydown event
      Special object returned by the event is called 'event'
      /We can use event.key to get the key pressed by the user
      */
      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r' || event.key === 'R') {
          if (isAutoPlaying) {
            stopAutoPlay();
            playGame('Rock');
            resetButtonPackage();
          } else {
            playGame('Rock');
            resetButtonPackage();
          }
        } else if(event.key === 'p' || event.key === 'P') {
          if (isAutoPlaying) {
            stopAutoPlay();
            playGame('Paper');
            resetButtonPackage();
          } else {
            playGame('Paper');
            resetButtonPackage();
          }
        } else if(event.key === 's' || event.key === 'S') {
          if (isAutoPlaying) {
            stopAutoPlay();
            playGame('Scissors');
            resetButtonPackage();
          } else {
            playGame('Scissors');
            resetButtonPackage();
          } 
        } else if(event.key === 'a' || event.key === 'A') {
          autoPlay();
        } else if(event.key === 'Escape') {
          if (isAutoPlaying) {
            stopAutoPlay();
          }
        }
      });

      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace' || event.key === 'Delete') {
          if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
            resetButton(); // ✅ call the real reset flow
            console.log('Pressing Backspace or Delete key.');
          }
        }
      });

      //Playing the Game
      function playGame(playerMove){
        const computerMove = pickComputerMove();
          
        if(playerMove === 'Rock') {
          if(computerMove === 'Rock') {
            result = 'Tie.'
          } else if(computerMove === 'Paper'){
            result = 'You lose.'
          } else {
            result = 'You win.'
          }
        } else if(playerMove === 'Paper'){
            if(computerMove === 'Rock') {
              result = 'You win.'
            } else if(computerMove === 'Paper'){
              result = 'Tie.'
            } else {
              result = 'You lose.'
            }

          } else{
            if(computerMove === 'Rock') {
                result = 'You lose.'
              } else if(computerMove === 'Paper'){
                result = 'You win.'
              } else {
                result = 'Tie.'
              }
           }
        
        //Calculating the Game Score
        if(result === 'You win.') {
          score.wins++;
        } else if(result === 'You lose.') {
          score.losses++;
        } else if(result === 'Tie.') {
          score.ties++;
        }

        localStorage.setItem('score', JSON.stringify(score));
        
        //Calling to Update after each playing
        updateResultElement();
        updateMoveElement(playerMove, computerMove);
        updateScoreElement();

        console.log(`${result}
You: ${playerMove}, Computer: ${computerMove}.
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
      }

      //Finding Computer Move
      function pickComputerMove(){
        const randomNumber = Math.random();
        let computerMove = '';

        if(randomNumber <= 1/3){
          computerMove = 'Rock';
        } else if(randomNumber <= 2/3) {
          computerMove = 'Paper';
        } else {
          computerMove = 'Scissors';
        }
        return computerMove;
      }

      //Updates result into HTML
      function updateResultElement() {
        document.querySelector('.js-result')
        .innerHTML = result;
      }

      //Updates moves into HTML
      function updateMoveElement(playerMove, computerMove) {
        document.querySelector('.js-moves')
          .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer.`;
      }

      // Loading score and reset button on page load if available. 
      if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
        document.querySelector('.js-reset-wrapper').innerHTML = `<button class="reset-score-button js-reset">Reset Score</button>`;
        document.querySelector('.js-reset').classList.add('show-reset');

         // Reset confirmation message showing when page loads with score
        document.querySelector('.js-reset').addEventListener('click', () => {
          resetButton();
        });
      } else {
        document.querySelector('.js-reset').classList.remove('show-reset');
        document.querySelector('.js-reset-wrapper').innerHTML = '';
      }

      // Complete Reset button package: 1. show, 2. click, 3. confirmation msg.
      function resetButtonPackage() {
        // Show reset button after the choosing move
          document.querySelector('.js-reset-wrapper').innerHTML = `<button class="reset-score-button js-reset">Reset Score</button>`;
          document.querySelector('.js-reset').classList.add('show-reset');
          document.querySelector('.js-confirm').innerHTML = '';
          
          // Calling the reset button function
          document.querySelector('.js-reset')
            .addEventListener('click', () => {
            resetButton();
          });
      }

      // Reset button function
      function resetButton() {
        stopAutoPlay(); // Stop auto play if it's running
        document.querySelector('.js-confirm').innerHTML = `
          Are you sure to reset the score?
          <button class="js-confirm-reset yes-button">Yes</button>
          <button class="js-cancel-reset no-button">No</button>`;

        document.querySelector('.js-reset').classList.remove('show-reset');

        isResetConfirmVisible = true; // ✅ Flag ON when confirmation is visible

        const confirmBtn = document.querySelector('.js-confirm-reset');
        const cancelBtn = document.querySelector('.js-cancel-reset');
        
        if (confirmBtn) {
          confirmBtn.addEventListener('click', (event) => {
            resetScore();
          });
        }
          
        if (cancelBtn) {
          cancelBtn.addEventListener('click', (event) => {
            document.querySelector('.js-confirm').innerHTML = '';
            document.querySelector('.js-reset').classList.add('show-reset');

            isResetConfirmVisible = false; // ✅ Flag OFF on cancel
          });
        }
      }

      // Global listener for confirmation keys (only works if visible)
      // Keydown for Yes
      document.body.addEventListener('keydown', (event) => {
        if (!isResetConfirmVisible) return;

        if (event.key === 'y' || event.key === 'Y' || event.key === 'Enter') {
          resetScore();
        }

        // Keydown for No
        if (event.key === 'n' || event.key === 'N') {
          document.querySelector('.js-confirm').innerHTML = '';
          document.querySelector('.js-reset').classList.add('show-reset');
          isResetConfirmVisible = false;
        }
      });

      
      // Reset Score 
      function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        console.log(`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
        document.querySelector('.js-confirm').innerHTML = '';
        document.querySelector('.js-reset-wrapper').innerHTML = '';
        document.querySelector('.js-moves').innerHTML = '';
        document.querySelector('.js-result').innerHTML = '';

        isResetConfirmVisible = false; // ✅ Flag OFF
      }

      //Updates score into HTML
      function updateScoreElement() {
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }