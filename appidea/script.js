const questions = [
    { text: "Does the ghost respond to the Spirit Box?", key: "spiritBox", image: "images/spirit_box.png" },
    { text: "Does it leave freezing temperatures?", key: "freezing", image: "images/freezing.png" },
    { text: "Does it have EMF Level 5?", key: "emf5", image: "images/emf.png" },
    { text: "Does it leave Ghost Writing?", key: "ghostWriting", image: "images/ghost_writing.png" },
    { text: "Does it leave fingerprints?", key: "fingerprints", image: "images/fingerprints.png" },
    { text: "Does it have Ghost Orbs?", key: "ghostOrbs", image: "images/ghost_orb.png" },
    { text: "Does it interact with D.O.T.S?", key: "dots", image: "images/dots_projector.png" }
];

const ghosts = [
    { name: "Spirit", clues: { spiritBox: false, freezing: false, emf5: true, ghostWriting: true, fingerprints: false, ghostOrbs: false, dots: false }, image: "images/spirit.png" },
    { name: "Wraith", clues: { spiritBox: true, freezing: false, emf5: true, ghostWriting: false, fingerprints: false, ghostOrbs: false, dots: true }, image: "images/wraith.png" },
    { name: "Phantom", clues: { spiritBox: true, freezing: false, emf5: false, ghostWriting: false, fingerprints: true, ghostOrbs: false, dots: true }, image: "images/phantom.png" },
    { name: "Banshee", clues: { spiritBox: false, freezing: false, emf5: false, ghostWriting: false, fingerprints: true, ghostOrbs: true, dots: true }, image: "images/banshee.png" },
    { name: "Demon", clues: { spiritBox: false, freezing: true, emf5: false, ghostWriting: true, fingerprints: true, ghostOrbs: false, dots: false }, image: "images/demon.png" },
    { name: "Revenant", clues: { spiritBox: false, freezing: true, emf5: false, ghostWriting: true, fingerprints: false, ghostOrbs: true, dots: false }, image: "images/revenant.png" },
    { name: "Shade", clues: { spiritBox: false, freezing: true, emf5: true, ghostWriting: true, fingerprints: false, ghostOrbs: false, dots: false }, image: "images/shade.png" },
    { name: "Oni", clues: { spiritBox: false, freezing: false, emf5: true, ghostWriting: false, fingerprints: false, ghostOrbs: false, dots: true }, image: "images/oni.png" },
    { name: "Yokai", clues: { spiritBox: true, freezing: false, emf5: false, ghostWriting: false, fingerprints: false, ghostOrbs: true, dots: true }, image: "images/yokai.png" },
    { name: "Mare", clues: { spiritBox: true, freezing: false, emf5: false, ghostWriting: true, fingerprints: false, ghostOrbs: true, dots: false }, image: "images/mare.png" },
    { name: "Jinn", clues: { spiritBox: true, freezing: false, emf5: true, ghostWriting: false, fingerprints: false, ghostOrbs: false, dots: false }, image: "images/jinn.png" },
    { name: "Mimic", clues: { spiritBox: true, freezing: true, emf5: false, ghostWriting: false, fingerprints: false, ghostOrbs: true, dots: true }, image: "images/mimic.png" },
    { name: "Twins", clues: { spiritBox: true, freezing: true, emf5: true, ghostWriting: false, fingerprints: true, ghostOrbs: true, dots: true }, image: "images/twins.png" },
    { name: "Hantu", clues: { spiritBox: false, freezing: true, emf5: true, ghostWriting: false, fingerprints: false, ghostOrbs: false, dots: false }, image: "images/hantu.png" },
    { name: "Goryo", clues: { spiritBox: false, freezing: true, emf5: false, ghostWriting: false, fingerprints: false, ghostOrbs: false, dots: true }, image: "images/goryo.png" }
];

let currentQuestion = 0;
let answers = {};
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const resultElement = document.getElementById("result");
const answerList = document.getElementById("answer-list");

function answer(response) {
    answers[questions[currentQuestion].key] = response;
    const li = document.createElement('li');
    li.textContent = questions[currentQuestion].text;
    const mark = document.createElement('span');
    mark.textContent = response ? ' ✔' : ' ✘';
    mark.style.color = response ? 'green' : 'red';
    li.appendChild(mark);
    answerList.appendChild(li);
    if (currentQuestion + 1 < questions.length) {
        currentQuestion++;
        showQuestion();
    } else {
        determineGhost();
    }
}

function showQuestion() {
    questionElement.textContent = questions[currentQuestion].text;
    questionImage.src = questions[currentQuestion].image;
    questionImage.alt = questions[currentQuestion].text;
}

function startAgain() {
    currentQuestion = 0;
    answers = {};
    answerList.innerHTML = '';
    resultElement.textContent = '';
    showQuestion();
}

function determineGhost() {
    const possibleGhosts = ghosts.filter(ghost =>
        Object.keys(ghost.clues).every(key =>
            answers[key] === undefined || ghost.clues[key] === answers[key]
        )
    );
    if (possibleGhosts.length === 1) {
        resultElement.innerHTML = `Ghost Type: ${possibleGhosts[0].name} <img src="${possibleGhosts[0].image}" alt="${possibleGhosts[0].name}">`;
    } else if (possibleGhosts.length > 1) {
        resultElement.innerHTML = "Possible Ghosts: " + possibleGhosts.map(g => `${g.name} <img src="${g.image}" alt="${g.name}">`).join(", ");
    } else {
        resultElement.textContent = "Unknown ghost";
    }
}

showQuestion();