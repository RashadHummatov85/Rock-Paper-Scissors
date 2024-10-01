$(document).ready(function () {
    let userChoice = "";
    let computerChoice = "";
    let userScore = 0;
    let computerScore = 0;
    let rounds = 0;
    const totalRounds = 5;

    // Function to generate computer choice
    function getComputerChoice() {
        const rand = Math.random();
        if (rand < 0.34) {
            return "rock";
        } else if (rand <= 0.67) {
            return "paper";
        } else {
            return "scissors";
        }
    }

    // Function to compare choices and declare a winner
    function compareChoices(playerSelection, computerSelection) {
        if (playerSelection === computerSelection) {
            return "It's a tie!";
        } else if (playerSelection === "rock") {
            return computerSelection === "scissors" ? "Rock beats Scissors! You win this round." : "Paper beats Rock! Computer wins this round.";
        } else if (playerSelection === "paper") {
            return computerSelection === "rock" ? "Paper beats Rock! You win this round." : "Scissors beats Paper! Computer wins this round.";
        } else if (playerSelection === "scissors") {
            return computerSelection === "paper" ? "Scissors beats Paper! You win this round." : "Rock beats Scissors! Computer wins this round.";
        }
    }

    // Function to update scores
    function updateScores(result) {
        if (result.includes("You win")) {
            userScore++;
        } else if (result.includes("Computer wins")) {
            computerScore++;
        }
        rounds++;
    }

    // Function to update the UI
    function updateUI(result) {
        $('#round-number').text(`Round: ${rounds} / ${totalRounds}`);
        $('#scores').text(`Player: ${userScore} | Computer: ${computerScore}`);
        $('.usermsg-result').hide().html(result).fadeIn(600);
    }

    // Function to declare the overall winner
    function declareWinner() {
        let finalMessage = "";
        if (userScore > computerScore) {
            finalMessage = `🎉 You win the game! Final Score: Player ${userScore} - Computer ${computerScore} 🎉`;
        } else if (computerScore > userScore) {
            finalMessage = `💻 Computer wins the game! Final Score: Computer ${computerScore} - Player ${userScore} 💻`;
        } else {
            finalMessage = "🤝 It's a tie game! 🤝";
        }
        $('.usermsg-result').hide().html(finalMessage).fadeIn(600);
        $('#reset-button').show();
    }

    // Function to reset the game
    function resetGame() {
        userScore = 0;
        computerScore = 0;
        rounds = 0;
        $('#round-number').text(`Round: ${rounds} / ${totalRounds}`);
        $('#scores').text(`Player: ${userScore} | Computer: ${computerScore}`);
        $('.usermsg-player').hide().html("");
        $('.usermsg-comp').hide().html("");
        $('.usermsg-result').hide().html("Make your selection");
        $('.playerdiv img').removeClass('chosen');
        $('.compdiv img').removeClass('chosen');
        $('#reset-button').hide();
    }

    // Function to handle player's choice
    function handlePlayerChoice(choice, element) {
        if (rounds >= totalRounds) return; // Prevent selection after game ends

        userChoice = choice;
        $('.playerdiv img').removeClass('chosen');
        $(element).addClass('chosen');
        $('.usermsg-player').hide().html(`You chose <strong>${userChoice}</strong>`).fadeIn(400);

        computerChoice = getComputerChoice();
        $('.compdiv img').removeClass('chosen');
        if (computerChoice === "rock") {
            $('.compdiv .rockpic').addClass('chosen');
        } else if (computerChoice === "paper") {
            $('.compdiv .paperpic').addClass('chosen');
        } else if (computerChoice === "scissors") {
            $('.compdiv .scispic').addClass('chosen');
        }
        $('.usermsg-comp').hide().html(`Computer chose <strong>${computerChoice}</strong>`).fadeIn(400);

        // Compare choices and update scores
        const result = compareChoices(userChoice, computerChoice);
        updateScores(result);
        updateUI(result);

        // Check if game has ended
        if (rounds === totalRounds) {
            declareWinner();
        }
    }

    // Event listeners for player choices
    $('.playerdiv .rockpic').click(function () {
        handlePlayerChoice("rock", this);
    });

    $('.playerdiv .paperpic').click(function () {
        handlePlayerChoice("paper", this);
    });

    $('.playerdiv .scispic').click(function () {
        handlePlayerChoice("scissors", this);
    });

    // Event listener for reset button
    $('#reset-button').click(function () {
        resetGame();
    });
});
