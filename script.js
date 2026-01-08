// user starting scores
var scores = {
    artemis: 0,
    helios: 0,
    athena: 0,
    poseidon: 0,
    hype: 0,
    mugger: 0,
    noncha: 0,
    social: 0
};

// questions
const questions =[
    // 1
    {
        question: "Welcome to AStaR! You’ve been abducted by an alien.",
        choices: [
            {text: 'LETSGOOOOO!!', type: 'hype'},
            {text: 'Assess the situation', type: 'mugger'},
            {text: 'OK', type: 'noncha'},
            {text: 'Hi! What\'s your name?', type: 'social'}
        ]
    },

    //2
    {
        question: "I’m bob! I love asking questions and going to school. Please be my friend for today. I\'ll give you a token at the end :)",
        choices: [
            {text: 'Of course!!', type: 'hype'},
            {text: 'I guess I can spare some time', type: 'mugger'},
            {text: 'Sure.', type: 'noncha'},
            {text: "Hi bob! You're so cute <3", type: 'social'}
        ]
    },

    // 3
    {
        question: "'Hurray! Tell me more about yourself. What's your favourite subject?'",
        choices: [
            {text: 'I want to try economics!', type: 'artemis'},
            {text: 'Geography', type: 'athena'},
            {text: 'I love history', type: 'helios'},
            {text: 'Literature!', type: 'poseidon'}
        ]
    },

    // 4
    {
        question: "An alien walks by. He's calling us to play frisbee with him!",
        choices: [
            {text: 'LETS PLAYYYY', type: 'hype'},
            {text: 'I would rather not but i guess it doesn\’t hurt to try', type: 'mugger'},
            {text: 'Hurray! What\’s his name?', type: 'social'},
            {text: '...', type: 'noncha'}
        ]
    },

    // 5
    {
        question: "A frisbee is coming towards you! What are you doing to catch the frisbee?",
        choices: [
            {text: 'Use projectile motion calculations to estimate where to avoid the frisbee', type: 'mugger'},
            {text: "'I got this!'", type: 'social'},
            {text: 'Scream ', type: 'hype'},
            {text: 'Stand. You attract frisbees.', type: 'noncha'}
        ]
    },

    // 6
    {
        question: "That was a great catch! How did you catch the frisbee?",
        choices: [
            {text: 'With the power of physics!', type: 'artemis'},
            {text: 'I know my biology ', type: 'athena'},
            {text: 'I read some literature on frisbees ', type: 'poseidon'},
            {text: 'Further maths.', type: 'helios'}
        ]
    },

    // 7
    {
        question: "That\'s amazing! Come let's go have iced lemon tea from the drinks stall lady. It's the best drink here :)",
        choices: [
            {text: 'Sure! Let\'s go get some drinks', type: 'social'},
            {text: 'Sounds great', type: 'noncha'},
            {text: 'YAAAAAY', type: 'hype'},
            {text: 'No. I only drink water', type: 'mugger'}
        ]
    },
    
    // 8
    {
        question: "You know! I don't understand why people dislike math. Do you like math?",
        choices: [
            {text: 'Yes!', type: 'artemis'},
            {text: 'NOOOO', type: 'poseidon'},
            {text: 'Kinda...', type: 'athena'},
            {text: 'eh', type: 'helios'}
        ]
    },

    // 9
    {
        question: "Well that was my last question. I got to go now! It was fun spending time with you in AStaR",
        choices: [
            {text: 'AWOOOOO', type: 'artemis'},
            {text: 'NEIGHHH', type: 'helios'},
            {text: 'HOOT HOOT', type: 'athena'},
            {text: 'AWOOSHAA!', type: 'poseidon'}
        ]
    },
    
    // 10
    {
        question: "Oh yeah! I promised to give you a token. Take it :)",
        choices: [
            {text: '💚', type: 'artemis'},
            {text: '❤️', type: 'helios'},
            {text: '💜', type: 'athena'},
            {text: '💙', type: 'poseidon'}
        ]
    }
];

// starting 
document.getElementById('quiz').style.display = 'none';
document.getElementById('result').style.display = 'none';
document.getElementById('restart').style.display = 'none';

function start(){
    current_qn = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);

    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('restart').style.display = 'none';

    display_qns();
}



function display_qns(){
    // hide other elements
    document.getElementById('result').style.display = 'none';
    document.getElementById('restart').style.display = 'none';


    const quiz = document.getElementById('quiz');
    const question = questions[current_qn];

    // display qn
    let html = `<p>${question.question}</p>`

    // loop through choices
    for (const choice of question.choices){
        html += `<button class='btn' value='${choice.type}' id='${choice}'>${choice.text}</button>`
    }

    quiz.innerHTML = html;
    handle_clicks();
}


// check if any of the btn has been clicked
function handle_clicks(){
    const choice_btns = document.querySelectorAll('.btn');
    choice_btns.forEach((button) => {
        button.addEventListener('click', next_qn);
    });
}


// next question
function next_qn(event){
    const chosen = event.target.value;

    // increment score -- use weights next time
    scores[chosen]++;
    
    /*
    //debug
    const debug_container = document.querySelector('.scores');
    html = "<br><br>";
    for(const [type, score] of Object.entries(scores)){
        html += `${type}: ${score}<br>`;
    }
    debug_container.innerHTML = html;
    */
    
    // check if it's last qn
    if (current_qn < questions.length - 1){
        current_qn++;
        display_qns();
    } else {
        show_result();
    }
}

// result
function show_result(){
    // split dictionary 
    const sliceAt = 4;
    const dataArr = Object.entries(scores);
    const house_scores = Object.fromEntries(dataArr.slice(0, sliceAt));
    const person_scores = Object.fromEntries(dataArr.slice(sliceAt));

    // find highest affinity
    let maxScore_house = Math.max(...Object.values(house_scores));
    let house = Object.keys(house_scores).filter(
        house => house_scores[house] === maxScore_house
    );

    let maxScore_person = Math.max(...Object.values(person_scores));
    let personality = Object.keys(person_scores).filter(
        personality => person_scores[personality] === maxScore_person
    );

    const final_house = breakTieRandom(house)
    const final_person = breakTieRandom(personality)




    // display
    const result = document.getElementById('result');
    let html = `<p> ${final_house} <br> ${final_person} </p>`
    html += `<img src="images/${final_house}.jpg">`
    //html += `<img src="images/${final_house}_${final_person}.jpg>"`
    result.innerHTML = html

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('restart').style.display = 'block';

}

// copied this from chatgpt :)
function breakTieRandom(candidates) {
    return candidates[Math.floor(Math.random() * candidates.length)];
}


function restart(){
    // reset
    current_qn = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);

    document.getElementById('result').style.display = 'none';
    document.getElementById('start-page').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    display_qns();
}

document.getElementById('restart_btn').addEventListener('click', restart);
document.getElementById('start_btn').addEventListener('click', start);

