const question = document.getElementById("question");
const result = document.querySelector(".score");
const userName = document.querySelector(".up-name");
const emailUser = document.querySelector(".email");
const choices = document.getElementsByClassName("radio-custom-label");
const radios = document.querySelectorAll("input[type=radio]");
var inputs = document.getElementsByTagName("input");

for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].type == "radio") {
    inputs[i].checked = false;
  }
}

console.log(choices);
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let reverse_counter = 60;
let questions = [
  {
    question:
      "Quel opérateur est utilisé pour concaténer des chaînes de caractères ? ",
    choice1: "add()",
    choice2: "+",
    choice3: "&",
    choice4: ".",
    answer: 2,
  },
  {
    question: "window.prompt() sert à ?",
    choice1: "modifier le caractère de prompt de la console",
    choice2: "faire défiler un texte en scrolling",
    choice3: "faire défiler une fenêtre",
    choice4: "afficher une boite de dialogue de saisie",
    answer: 4,
  },
  {
    question: "Si ch1='ABCED', que retourne ch1.charAt(3)",
    choice1: "une erreur",
    choice2: "true",
    choice3: "E",
    choice4: "C",
    answer: 3,
  },
  {
    question: "Qu'est-ce que JSON par rapport au JavaScript ?",
    choice1: "un langage de requêtes",
    choice2: "un format d'échange de données texte",
    choice3: "un langage de programmation dérivé",
    choice4: "une variable d'environnement système",
    answer: 2,
  },
  {
    question: "Comment lire le jour du mois dans une date ?",
    choice1: "Day()",
    choice2: "Date.parse()",
    choice3: "getDate()",
    choice4: "getDay()",
    answer: 3,
  },
  {
    question: "Comment trouver la longueur de la variable Nom ?",
    choice1: "width(Nom)",
    choice2: "Nom.length",
    choice3: "length(Nom)",
    choice4: "Nom.width",
    answer: 2,
  },
  {
    question: "Comment trouver le max de x et y?",
    choice1: "ceil(x, y)",
    choice2: "max(x, y)",
    choice3: "Math.max(x, y)",
    choice4: "top(x, y)",
    answer: 3,
  },
  {
    question: "La fonction javascript_info()",
    choice1: "n'existe pas",
    choice2: "renvoie la version de JavaScript utilisée",
    choice3: "permet de déboguer une variable",
    choice4: "permet de connaître l'OS de l'utilisateur",
    answer: 1,
  },
  {
    question: "Le mot clé 'var' permet de déclarer des variables ",
    choice1: "locales ou globales",
    choice2: "locales uniquement",
    choice3: "globales uniquement",
    choice4: "n'existe pas en JavaScript",
    answer: 1,
  },
  {
    question:
      "Que renvoie 'navigator.appName' si Internet Explorer est utilisé ?",
    choice1: "le n° de version d'IE",
    choice2: "une erreur",
    choice3: "Mozilla",
    choice4: "Microsoft Internet Explorer",
    answer: 4,
  },
  {
    question: "Quel est l'utilité de 'unsigned' ?",
    choice1: "déclarer un plugin sans certificat",
    choice2: "prendre la valeur absolue d'un nombre",
    choice3: "n'existe pas en JavaScript",
    choice4: "déclarer un entier non signé",
    answer: 3,
  },
  {
    question: "Que retourne typeof (1>2) ?",
    choice1: "integer",
    choice2: "boolean",
    choice3: "false",
    choice4: "true",
    answer: 2,
  },
  {
    question: "Que signifie NaN ?",
    choice1: "Not area Negative",
    choice2: "Number area NULL",
    choice3: "Not a Number",
    choice4: "Not at NULL",
    answer: 3,
  },
  {
    question: "Le DOM",
    choice1: "ne peut pas être manipulé par JavaScript",
    choice2: "décrit la structure du document HTML ou XML",
    choice3: "est spécifique a JavaScript",
    choice4: "est un moteur de bases de données",
    answer: 1,
  },
  {
    question: "alert((1||0)?VRAI:FAUX); affiche",
    choice1: "une erreur",
    choice2: "VF",
    choice3: "VRAI",
    choice4: "FAUX",
    answer: 3,
  },
  {
    question: "Comment passer à l'itération suivante dans une boucle for() ?",
    choice1: "break",
    choice2: "next",
    choice3: "return",
    choice4: "continue",
    answer: 4,
  },
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 15;
let downloadTimer;
const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("resul.html");
  }

  if (questionCounter >= MAX_QUESTIONS - 1) {
    let finish = document.querySelector(".btn-2");
    finish.textContent = "Terminer";
  }
  console.log("NEW");
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionCounter];
  question.innerText = currentQuestion.question;
  //questions.innertText = currentQuestion.question;

  Array.from(choices).forEach((choice) => {
    console.log(choice);
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  Array.from(radios).forEach((choice) => {
    choice.checked = false;
  });
  //availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  let myProgress = document.getElementById("myProgress");
  myProgress.innerHTML = "<div id='myBar'></div>";

  let myBar = document.getElementById("myBar");
  let nextNumber = document.querySelector(".quiz-number");
  nextNumber.innerText = `Question ${questionCounter}/15`;
  myBar.style.animationDuration = "60s";

  myBar.style.animationPlayState = "running";
  clearInterval(downloadTimer);
  reverse_counter = 60;
  downloadTimer = setInterval(function () {
    if (reverse_counter <= 0) {
      clearInterval(downloadTimer);
      console.log("end");
      // pas certaine
      checkAnswers();
      getNewQuestion();
    }

    document.getElementById("counting").innerHTML = reverse_counter;
    reverse_counter--;
  }, 1000);
};

const choiceClick = (e) => {
  e.target.parentElement.querySelector("input").checked = true;
  const selectedAnswer =
    e.target.parentElement.querySelector("label").dataset["number"];
  console.log(selectedAnswer);
  checkAnswers(selectedAnswer);
  Mycolor();
};

Array.from(choices).forEach((choice) => {
  choice.addEventListener("click", (e) => {
    choiceClick(e);
  });
});
Array.from(radios).forEach((choice) => {
  choice.addEventListener("click", (e) => {
    choiceClick(e);
  });
});

const commencer = () => {
  const queue_url = getUrl();
  console.log(queue_url);
  if (queue_url === "quiz.html") {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    nextpage();
    cancelButton();
  } else if (queue_url === "index.html") {
    beginQuiz();
    validateName();
  } else {
    acueil();
  }
};
function nextpage() {
  let nextButton = document.querySelector(".btn-2");
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (nextButton.style.backgroundColor !== "rgb(2, 138, 61)") return;
    reverse_counter = 60;
    getNewQuestion();
    var element = document.querySelector(".btn-2");
    element.style.backgroundColor = "rgba(2, 138, 61, 0.42)";
  });
}
function acueil() {
  let buttonAccueil = document.querySelector(".accueil");
  buttonAccueil.addEventListener("click", (e) => {
    console.log(buttonAccueil);
    e.preventDefault();
    window.location.assign("/index.html");
  });
  const storedScore = localStorage.getItem("score");
  result.innerHTML = `0${storedScore || 0}/15`;
  localStorage.setItem("score", "");
  const storeName = localStorage.getItem("up-name");
  userName.innerHTML = `${storeName || ""}`;
  const userEmail = localStorage.getItem("email");
  emailUser.innerHTML = `${userEmail || ""}`;
  if (storedScore < 10) {
    document.querySelector(".one-image").src =
      "depositphotos_87592936-stock-illustration-wrong-mark-in-cycle-frame.jpg";
    document.querySelector(".one-image").style.width = "227px";
  } else {
    document.querySelector(".one-image").src = "téléchargement.png";
    document.querySelector(".one-image").style.width = "227px";
  }
}

function getUrl() {
  var urlcourante = document.location.href;
  var urlcourante = urlcourante.replace(/\/$/, "");
  queue_url = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
  return queue_url;
}
function beginQuiz() {
  let buttonBegin = document.querySelector(".click");
  buttonBegin.addEventListener("click", (e) => {
    //e.preventDefault();
    // window.location.assign("/quiz.html");
  });
}
function cancelButton() {
  let cancelButton = document.querySelector(".btn-1");
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("/resul.html");
  });
}
function validateName() {
  console.log(document.querySelector("form"));
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    this.querySelectorAll("input, textarea").forEach(function (f) {
      console.log(f);
      switch (f.name) {
        case "nom": {
          if (f.value == "") {
            isValid = false;
            f.parentElement.classList.add("error");
            f.parentElement.querySelector("span").textContent =
              " N’oubliez pas de renseigner votre nom avant de commencer le Quiz.";
          } else if (f.value.length < 2) {
            isValid = false;
            f.parentElement.classList.add("error");
            f.parentElement.querySelector("span").textContent =
              " veillez renseigner un nom  un nom d’au moins deux caractères.";
          } else {
            f.parentElement.querySelector("span").textContent = "";
            f.parentElement.classList.remove("error");
            localStorage.setItem("up-name", f.value);
          }
          break;
        }
        case "email": {
          if (f.value == "") {
            isValid = false;
            f.parentElement.classList.add("error");
            f.parentElement.querySelector("span").textContent =
              " N’oubliez pas de renseigner votre email avant de commencer le Quiz.";
          } else if (
            f.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/g) === null
          ) {
            isValid = false;
            f.parentElement.classList.add("error");
            f.parentElement.querySelector("span").textContent =
              "veillez renseigner une adresse email valide.";
          } else {
            f.parentElement.querySelector("span").textContent = "";
            f.parentElement.classList.remove("error");
            localStorage.setItem("email", f.value);
          }
          break;
        }
      }
      console.log("isValid ", isValid);
    });

    if (isValid) {
      window.location.assign("/quiz.html");
    }
  });

  console.log("validateName");
}

function checkAnswers(answer) {
  if (+answer === +currentQuestion.answer) {
    score++;
    localStorage.setItem("score", score);
    console.log("good answer ", score);
  }
}
function Mycolor() {
  var element = document.querySelector(".btn-2");
  element.style.backgroundColor = "#028A3D";
}

commencer();
