// On récupère la section dans laquelle va apparaître le login
const sectionLogin = document.getElementById("login");

// Création du titre
const titleElement =  document.createElement("h2");
titleElement.innerHTML = "Login";
sectionLogin.appendChild(titleElement);

// Création d'une div qui va contenir le formulaire du login
const divElement = document.createElement("div");
divElement.classList.add("login");
sectionLogin.appendChild(divElement);

// Création d'un formulaire
const formElement = document.createElement("form");
formElement.action = "#";
formElement.method = "post";
divElement.appendChild(formElement);

// Création label et input pour l'email

const labelEmailElement = document.createElement("label");
labelEmailElement.setAttribute("for", "email");
labelEmailElement.innerText = "Email";
const inputEmailElement = document.createElement("input");
inputEmailElement.type = "email";
inputEmailElement.name = "email";
inputEmailElement.id = "email";

formElement.appendChild(labelEmailElement);
formElement.appendChild(inputEmailElement);

// Création label et input pour le mdp
const labelPasswordElement = document.createElement("label");
labelPasswordElement.innerText = "Password";
labelPasswordElement.setAttribute("for", "password");
const inputPasswordElement = document.createElement("input");
inputPasswordElement.type = "password";
inputPasswordElement.name = "password";
inputPasswordElement.id = "password";

formElement.appendChild(labelPasswordElement);
formElement.appendChild(inputPasswordElement);

// Création de l'input submit

const buttonSubmitElement = document.createElement("button");
buttonSubmitElement.type = "submit";
buttonSubmitElement.innerText = "Se connecter";

formElement.appendChild(buttonSubmitElement);

// Création d'un lien mdp oublié

const aElement = document.createElement("a");
aElement.classList.add("password");
aElement.href = "#";
aElement.innerText = "Mot de passe oublié ?";
formElement.appendChild(aElement);

