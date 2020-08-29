var cards = [{
        name: "star",
        style: ''
    },
    {
        name: "square",
        style: ''
    },
    {
        name: "circle",
        style: ''
    },
    {
        name: "waves",
        style: ''
    },
    {
        name: "plus",
        style: ''
    }
];
var voiceLines = {
    opening: "I'm going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind. When you're ready, if you are ever ready, say the name out loud.",
    correct: "You got that correct but you're still just a mortal.",
    incorrect: "You were wrong, better luck next time, non-ESP-gifted-mortal.",
    notvalid: "That was not a valid card. Try again, mortal.",
    exit: "Goodbye.",
    next: "Next",
    console: "That's alright mortal, we can't all be gifted."
}

var datastore = {
    recognizing: false,
    final_transcript: "",
    button_states: {
        start: 'Listen',
        during: 'Listening',
        error: 'Error'
    },
    error: {
        speech: 'no-speech',
        mic: 'audio-capture',
        blocked: 'not-allowed'
    }
}
$("#start_button").text(datastore.button_states.start);

var recognition = null;
{
    var diagnostic = $("#diagnostic");

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    recognition = new SpeechRecognition();
    var grammar = '#JSFG V1.0; grammar cards; public <card> = star | circle | square | wave | waves | plus ;'
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammar = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var recognizing = false;

    recognition.addEventListener('start', function(){
        datastore.recognizing = true;
        console.log('started listening');
        setSpeechButtonText(datastore.button_states.during);
    });

    recognition.addEventListener('result', function(){
        var result = event.results[0][0];
        let word = result.transcript.toLowerCase();
        diagnostic.text(`Result received ${word}`);
        console.log(`Result received ${word}`);
        console.log(`Confidence: ${result.confidence}`);
        const card = getCard(word);
        if (card === undefined) {
            console.log("not a valid card");
            speak(voiceLines.notvalid);
        } else {
            console.log("valid card");
            speak(voiceLines.correct);
        }
    });

    recognition.addEventListener('end', function(){
        datastore.recognizing = false;
        console.log('stopped listening');
        setSpeechButtonText(datastore.button_states.start);
    });

    recognition.onspeechend = function(){
        console.log("Speech has stopped being detected");
    }

    recognition.onnomatch = function() {
        diagnostic.text("I didn't recognize that word");
        console.log("Speech not recognized");
    }

    recognition.onerror = function(event) {
        diagnostic.text(`Error occured in recognition: ${event.error}`);
    }
}


$('#speak').click(() => {
    if (datastore.recognizing) return;
    setSpeechButtonText(datastore.button_states.during);
    recognition.start();
    console.log('Ready to recieve a color command');
});

function getCard(input){
    return cards.find(element => element.name === input);
}

function setSpeechButtonText(text) {
    console.log(`setting button text to: ${text}`);
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

function begin() {
    speak(voiceLines.opening);
}

function correct() {
    speak(voiceLines.correct);
}

function incorrect() {
    speak(voiceLines.incorrect);
}