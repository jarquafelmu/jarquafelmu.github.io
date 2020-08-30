var datastore = {
    button_states: {
        start: 'Listen',
        during: 'Listening',
        error: 'Error'
    },
    cards: [{
        name: "star",
        face: '🂱'
    },
    {
        name: "square",
        face: '🂲'
    },
    {
        name: "circle",
        face: '🂳'
    },
    {
        name: "waves",
        face: '🂴'
    },
    {
        name: "plus",
        face: '🂵'
    }],
    mic_img: '🎤',
    deck: [],
    decksize: 25,  
    error: {
        speech: 'no-speech',
        mic: 'audio-capture',
        blocked: 'not-allowed'
    },
    numcopies: 5,
    recognizing: false,
    score: {
        correct: 0,
        total: 25,
        target: 11
    },
    voicelines: {
        opening: "I'm going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind. When you're ready, if you are ever ready, say the name out loud. You may also say 'cancel' if you are scared.",
        // correct: "You got that correct but you're still just a mortal.",
        correct: "correct",
        incorrect: "You were wrong, better luck next time, non-ESP-gifted-mortal.",
        notvalid: "invalid",
        notunderstood: "I didn't get that, try again",
        exit: "Goodbye.",
        next: "Next",
        console: "That's alright mortal, we can't all be gifted."
    }
}
$("#start_button").text(datastore.button_states.start);

var recognition = null;
{ // voice recognition setup
    var diagnostic = $("#diagnostic");

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    recognition = new SpeechRecognition();
    var grammar = '#JSFG V1.0; grammar cards; public <card> = star | circle | square | wave | waves | plus | cancel | quit ;'
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammar = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var recognizing = false;

    recognition.addEventListener('start', function () {
        datastore.recognizing = true;
        console.debug('started listening');
        setSpeechButtonText(datastore.button_states.during);
        $("#overlay").show();
    });

    recognition.addEventListener('result', function () {
        var result = event.results[0][0];
        let word = result.transcript.toLowerCase();
        console.debug(`Result received ${word}`);

        const card = getCard(word);
        if (card === undefined) {
            console.debug("not a valid card");
            speak(datastore.voicelines.notvalid);
        } else {
            console.debug("valid card");
            speak(datastore.voicelines.correct);
            hideCards(true);
            $(`#${card.name}`).show();
            
        }
    });

    recognition.addEventListener('end', function () {
        datastore.recognizing = false;
        console.debug('stopped listening');
        setSpeechButtonText(datastore.button_states.start);
        $("#overlay").hide();
    });

    recognition.onspeechend = function () {
        console.debug("Speech has stopped being detected");
    }

    recognition.onnomatch = function () {
        diagnostic.text("I didn't recognize that word");
        console.debug("Speech not recognized");
    }

    recognition.onerror = function (event) {
        console.error(`error: ${event.error}`);
    }
}

function getCard(input) {
    return datastore.cards.find(element => element.name === input);
}

function setSpeechButtonText(text) {
    // console.log(`setting button text to: ${text}`);
    $("#speak").html(text);
}

function speak(msg) {
    if (!('speechSynthesis' in window)) {
        alert("Your browser does not support speech synthesis.");
        return false;
    } else {
        var u = new SpeechSynthesisUtterance(msg);
        // u.text = msg;
        speechSynthesis.speak(u);
        return true;
    }
}

function hideCards(all = false) {
    let target = ".card"
    if (!all)
        target = `${target}.face`
    $(target).hide();
}


function begin() {
    speak(datastore.voicelines.opening);
}

function correct() {
    speak(datastore.voicelines.correct);
}

function incorrect() {
    speak(datastore.voicelines.incorrect);
}

function buildDeck() {
    datastore.cards.forEach((card) => {
        for (let i = 0; i < datastore.numcopies; ++i) {
            deck.push(card.face);
        }
    });

    deck.sort((a, b) => {
        // by giving a random number, the cards will be sorted in a
        // random order
        return Math.random() - 0.5;
    });
}

function deal() {
    return deck.pop();
}

hideCards();

$('#speak').click(() => {
    if (datastore.recognizing) return;
    recognition.start();
    setSpeechButtonText(datastore.button_states.during);
    console.log('Ready to receive a color command');
});



// $("#overlay").click(() => {
//     $(this).hide();
//     recognition.stop();
// });

// game
function game() {
    // pick a card
    // introduce the user
    // user guesses
    // give feedback
    // if correct mark and next
    // if incorrect 'console' and next
    // loop 25 times
}


