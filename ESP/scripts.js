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
    opening: "I'm going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind. When you're ready, say the name out loud.",
    correct: "You got that correct, you're still a puny mortal.",
    incorrect: "You were wrong, better luck next time, non-ESP-gifted-mortal.",
    notvalid: "that was not a valid option.",
    exit: "Goodbye.",
    next: "next",
    console: "that's alright mortal, we can't all be gifted"
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
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    recognition = new SpeechRecognition();
    var grammar = '#JSFG V1.0; grammar cards; public <card> = star | circle | square | waves | plus ;'
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammar = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function(){
        datastore.recognizing = true;
        console.log('started listening');
        $("#start_button").text(datastore.button_states.during);
    }

    recognition.onresult = function(event) {
        var result = event.results[0][0];
        diagnostic.text(`Result received ${result.transcript}`);
        console.log(`Confidence: ${result.confidence}`);
    }

    recognition.onstop = function(){
        datastore.recognizing = false;
        console.log('stopped listening');
        $("#start_button").text(datastore.button_states.start);
    }

    recognition.onspeechend = function(){
        recognition.stop();
    }

    recognition.onnomatch = function() {
        diagnostic.text("I didn't recognize that card");
        console.log("Speech not recognized");
    }

    recognition.onerror = function(event) {
        diagnostic.text(`Error occured in recognition: ${event.error}`);
    }
}


function speechRecognition() {
    if (datastore.recognizing) {
        datastore.recognizing = false;
        console.log('force stopping');
        recognition.stop();
        return;
    }

    recognition.start();
    console.log('Ready to recieve a color command');
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