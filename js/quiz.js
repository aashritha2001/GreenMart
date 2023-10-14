let userAnswers = 0;
let currentQuestion = 1;

function nextQuestion() {
    let selectedAnswer = document.querySelector('input[name="answer"]:checked');
    let errorMessageElement = document.getElementById('errorMessage');

    if (currentQuestion >= 3) {
        if (selectedAnswer) {
            errorMessageElement.textContent = '';
            if (selectedAnswer.value === 'yes') {
                userAnswers++;
            }
            if (currentQuestion < 4) {
                currentQuestion++;
                updateQuestion(currentQuestion);
            } else {
                displaySpecialOffer();
            }
        }
        else {
            errorMessageElement.textContent = 'Please select an answer before proceeding.';
        }
        displaySpecialOffer();
        return;
    }

    if (selectedAnswer) {
        errorMessageElement.textContent = '';
        if (selectedAnswer.value === 'yes') {
            userAnswers++;
            console.log(userAnswers);
        }
        if (currentQuestion < 4) {
            currentQuestion++;
            updateQuestion(currentQuestion);
        } else {
            displaySpecialOffer();
        }
    }
    else {
        errorMessageElement.textContent = 'Please select an answer before proceeding.';
    }
}

function skipQuestion() {
    console.log(currentQuestion);
    if (currentQuestion <= 3) {
        currentQuestion++;
        updateQuestion(currentQuestion);
        if (currentQuestion == 4) {
            displaySpecialOffer();
        }
    } else {
        displaySpecialOffer();
    }
}

function updateQuestion(questionNum) {
    // Reset all radio buttons for the current question
    let radioButtons = document.querySelectorAll('input[name="option' + currentQuestion + '"]');
    radioButtons.forEach(button => button.checked = false);

    if (questionNum == 2) {
        document.getElementById('question1').textContent = `Are you a low income person?`;
        //document.getElementById('specialOffer').textContent = '';
        document.querySelector('input[name="answer"]').checked = false;
    }
    else if (questionNum == 3) {
        document.getElementById('question1').textContent = `Are you eligible for a military discount?`;
        //document.getElementById('specialOffer').textContent = '';
        document.querySelector('input[name="answer"]').checked = false;
    }

}

function displaySpecialOffer() {
    // Check if all answers are 'yes'
    if (userAnswers >= 3) {
        let offerText = "You qualify for $100 off your purchase!";
        document.getElementById('specialOfferPositive').textContent = offerText;
    } else {
        let offerText = "Unfortunately, you do not qualify for the discount.";
        document.getElementById('specialOfferNegative').textContent = offerText;
    }
}

function displayQuestionContainer() {
    console.log("entered function");
    document.getElementById('quiz').style.display = 'block';
}