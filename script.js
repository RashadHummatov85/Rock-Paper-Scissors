$(document).ready(function () {
    var userChoice = "";
    var computerChoice = "";
    var userScore = 0;
    var computerScore = 0;
    var rounds = 0;

    // Function to generate computer choice
    function getCompChoice() {
        computerChoice = Math.random();
        if (computerChoice < 0.34) {
            computerChoice = "rock";
            $('.usermsg-comp').hide().html("Computer chose " + computerChoice).fadeIn(1200);
            $('.compdiv .rockpic').addClass('chosen').siblings().removeClass('chosen');
        } else if (computerChoice <= 0.67) {
            computerChoice = "paper";
            $('.usermsg-comp').hide().html("Computer chose " + computerChoice).fadeIn(1200);
            $('.compdiv .paperpic').addClass('chosen').siblings().removeClass('chosen');
        } else {
            computerChoice = "scissors";
            $('.usermsg-comp').hide().html("Computer chose " + computerChoice).fadeIn(1200);
            $('.compdiv .scispic').addClass('chosen').siblings().removeClass('chosen');
        }
        return computerChoice;
    }

    // Function to compare choices and declare a winner
    function compare(playerSelection, computerSelection) {
        if (playerSelection === computerSelection) {
            return "It's a tie";
        } else if (playerSelection === "rock") {
            return computerSelection === "scissors" ? "Rock wins" : "Paper wins";
        } else if (playerSelection === "paper") {
            return computerSelection === "rock" ? "Paper wins" : "Scissors wins";
        } else if (playerSelection === "scissors") {
            return computerSelection === "paper" ? "Scissors wins" : "Rock wins";
        }
    }

    // Function to play five rounds
    function playRound(playerSelection, computerSelection) {
        var result = compare(playerSelection, computerSelection);

        if (result.includes("Rock wins") || result.includes("Paper wins") || result.includes("Scissors wins")) {
            if (result.toLowerCase().includes(playerSelection)) {
                userScore++;
            } else {
                computerScore++;
            }
        }

        rounds++;

        // Display round result
        $('.usermsg-result').hide().html(result).fadeIn(1600);

        // After five rounds, declare the winner
        if (rounds === 5) {
            if (userScore > computerScore) {
                $('.usermsg-result').hide().html("Player wins the game with score: " + userScore + " - " + computerScore).fadeIn(1600);
            } else if (computerScore > userScore) {
                $('.usermsg-result').hide().html("Computer wins the game with score: " + computerScore + " - " + userScore).fadeIn(1600);
            } else {
                $('.usermsg-result').hide().html("It's a tie game!").fadeIn(1600);
            }

            // Reset the game after 5 rounds
            rounds = 0;
            userScore = 0;
            computerScore = 0;
        }
    }

    // Player selects rock
    $('.playerdiv .rockpic').click(function () {
        userChoice = "rock";
        $(this).addClass('chosen').siblings().removeClass('chosen');
        $('.usermsg-player').hide().html("You have chosen rock").fadeIn(400);
        var compChoice = getCompChoice();
        playRound(userChoice, compChoice);
    });

    // Player selects paper
    $('.playerdiv .paperpic').click(function () {
        userChoice = "paper";
        $(this).addClass('chosen').siblings().removeClass('chosen');
        $('.usermsg-player').hide().html("You have chosen paper").fadeIn(400);
        var compChoice = getCompChoice();
        playRound(userChoice, compChoice);
    });

    // Player selects scissors
    $('.playerdiv .scispic').click(function () {
        userChoice = "scissors";
        $(this).addClass('chosen').siblings().removeClass('chosen');
        $('.usermsg-player').hide().html("You have chosen scissors").fadeIn(400);
        var compChoice = getCompChoice();
        playRound(userChoice, compChoice);
    });
});
