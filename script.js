// user starting scores
var scores = {
    artemis: 0,
    helios: 0,
    athena: 0,
    poseidon: 0,
};

// questions
const questions = [
    // 1 
    {
        question: `Welcome to AStaR! You’ve been abducted by an alien. <br>'I’m Bob! I love asking questions and going to school. <br>Please be my friend for today.'`,
        choices: [
            { text: 'Of course!!', type: 'artemis' },
            { text: "Hi Bob! You're so cute <3", type: 'helios' },
            { text: 'I guess I can spare some time', type: 'athena' },
            { text: 'Sure.', type: 'poseidon' },
        ]
    },

    // 2
    {
        question: `'Hurray! Tell me more about yourself. <br>Which of the following subjects would you most likely study?'`,
        choices: [
            { text: 'I want to try economics!', type: 'artemis' },
            { text: 'Geography', type: 'athena' },
            { text: 'I love history', type: 'helios' },
            { text: 'Literature!', type: 'poseidon' }
        ]
    },

    // 3
    {
        question: `'That's my favourite subject! <br>Look! Our Principal, Mr Heng, is inviting us to play frisbee with him'`,
        choices: [
            { text: 'LETS PLAYYYY', type: 'artemis' },
            { text: 'I would rather not but I guess it doesn\’t hurt to try', type: 'athena' },
            { text: 'Hurray! That\'s so cool', type: 'helios' },
            { text: '...', type: 'poseidon' }
        ]
    },

    // 4 frisbee thrown
    {
        question: `A frisbee is coming towards you! <br>What are you doing to catch the frisbee?`,
        choices: [
            { text: 'Use projectile motion calculations to estimate where to avoid the frisbee', type: 'artemis' },
            { text: "'I got this!'", type: 'helios' },
            { text: 'Scream ', type: 'athena' },
            { text: 'Stand. You attract frisbees.', type: 'poseidon' }
        ]
    },

    // 5 are you ladies okay?
    {
        question: `'That was a great catch! <br>How did you catch the frisbee?'`,
        choices: [
            { text: 'Assuming gravitational constant = 10 ms^2 ... ', type: 'artemis' },
            { text: 'Moving faster means higher rate of aerobic respiration ', type: 'athena' },
            { text: 'W\'s in the chat!!', type: 'poseidon' },
            { text: 'Further maths.', type: 'helios' }
        ]
    },

    // 6 drinks stall lady
    {
        question: `'That\'s amazing!<br> Come, let's go have iced lemon tea from the drinks stall lady. <br>It's the best drink here :)'`,
        choices: [
            { text: 'Sure! Let\'s go get some drinks', type: 'helios' },
            { text: 'Sounds great', type: 'athena' },
            { text: 'YAAAAAY', type: 'artemis' },
            { text: 'No. I only drink water', type: 'poseidon' }
        ]
    },

    // 7
    {
        question: `"AStaR has many animals. <br>What's your favourite animal?"`,
        choices: [
            { text: 'Wolves', type: 'artemis' },
            { text: 'Sharks', type: 'poseidon' },
            { text: 'Owls', type: 'athena' },
            { text: 'Horses', type: 'helios' }
        ]
    },

    // 8
    {
        question: `"Well that was my last question. I got to go now! <br>It was fun spending time with you in AStaR"`,
        choices: [
            { text: 'AWOOOOOOO', type: 'artemis' },
            { text: 'SUNKISSED SHAWTIESSS', type: 'helios' },
            { text: 'HOOT HOOT', type: 'athena' },
            { text: 'AWOOSHAAA', type: 'poseidon' }
        ]
    }
];

const profiles = {
    artemis: `“Energy first, think later.”<br><br>You dominate the night. Artemis students are analytical and curious, often gravitating toward Physics, Chemistry, Math, and Economics.<br><br>You are the embodiment of enthusiasm. When something exciting happens, you’re already there — probably yelling, probably smiling. You thrive on momentum, spontaneity, and shared excitement.`,
    helios: `“People first, always.” <br><br>You dominate the sky. Helios students walk their own path, known for unconventional subject combinations and creative thinking.<br><br>You’re warm, friendly, and naturally curious about others. Conversations energise you, and you value connection over competition.`,
    athena: `“Locked in. No distractions.”<br><br>You dominate wisdom. Athena students value understanding and balance, commonly taking Biology, Chemistry, Math, and Economics.<br><br>You are focused, driven, and determined. When you set a goal, you commit to it fully — whether it’s academics, self-improvement, or proving something`,
    poseidon: `“It is what it is.”<br><br> You dominate the depths. <br>Poseidon students thrive in expression and interpretation, often leaning toward arts and humanities, sometimes paired with sciences.<br><br>You’re calm, composed, and unfazed. While chaos unfolds around you, you remain cool and grounded. You don’t rush, and you don’t stress unless absolutely necessary.`
}

// starting 
document.getElementById('quiz').style.display = 'none';
document.getElementById('result').style.display = 'none';
document.getElementById('restart').style.display = 'none';

function start() {
    current_qn = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);

    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('restart').style.display = 'none';

    display_qns();
}



function display_qns() {
    // hide other elements
    document.getElementById('result').style.display = 'none';
    document.getElementById('restart').style.display = 'none';


    const quiz = document.getElementById('quiz');
    const question = questions[current_qn];

    // display qn
    let html = `<div class="qn">`
    html += `<p><strong>Q${current_qn + 1}/${questions.length}</strong><br> ${question.question} </p>`
    html += `<img class="scene" src="images/scenes/${current_qn + 1}.PNG">`
    html += `</div>`

    // loop through choices
    for (const choice of question.choices) {
        html += `<button class='btn' value='${choice.type}' id='${choice}'>${choice.text}</button>`
    }

    quiz.innerHTML = html;
    handle_clicks();
}


// check if any of the btn has been clicked
function handle_clicks() {
    const choice_btns = document.querySelectorAll('.btn');
    choice_btns.forEach((button) => {
        button.addEventListener('click', next_qn);
    });
}


// next question
function next_qn(event) {
    const chosen = event.target.value;

    // increment score -- use weights next time
    scores[chosen]++;

    //debug
    /*
    const debug_container = document.querySelector('.scores');
    html = "<br><br>";
    for(const [type, score] of Object.entries(scores)){
        html += `${type}: ${score}<br>`;
    }
    debug_container.innerHTML = html;
    */

    // check if it's last qn
    if (current_qn < questions.length - 1) {
        current_qn++;
        display_qns();
    } else {
        show_result();
    }
}

// result
function show_result() {
    let maxScore_house = Math.max(...Object.values(scores));
    let house = Object.keys(scores).filter(
        house => scores[house] === maxScore_house
    );

    const final_house = breakTieRandom(house)

    // display
    const result = document.getElementById('result');
    let html = `<h1> Results </h1>`
    html += `<img class="img" src="images/${final_house}.PNG">`
    html += `<p> Your house: <strong> ${capitalizeFirstLetter(final_house)}</strong> <br> </p>`
    html += `<p>${profiles[final_house]} <br></p>`
    result.innerHTML = html

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('restart').style.display = 'block';

}

// copied this from chatgpt :)
function breakTieRandom(candidates) {
    return candidates[Math.floor(Math.random() * candidates.length)];
}

function restart() {
    // reset
    current_qn = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);

    document.getElementById('result').style.display = 'none';
    document.getElementById('start-page').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    display_qns();
}



// copied from stack overflow
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

document.getElementById('restart_btn').addEventListener('click', restart);
document.getElementById('start_btn').addEventListener('click', start);

