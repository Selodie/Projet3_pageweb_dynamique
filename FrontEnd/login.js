
// Appel de l'API avec la méthode POST
async function fetchUsers (email, password) {
    const url = 'http://localhost:5678/api/users/login';
    const response = await fetch (url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer Token"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    return response.json();
}

const form = document.querySelector('form');

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();

    // On récupère la valeur des input email et mdp
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    // 
    fetchUsers(emailValue, passwordValue).then(response => {
        // 
        if (response.token){
            //
            let token = response.token;
            localStorage.setItem("token", token);
            console.log(token);
            window.location.replace( "index.html");    
        // 
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe")
        }
    });
})









// const options = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json', Accept: 'application/json'},
//     body: '{"email":"sophie.bluel@test.tld","password":"S0phie"}'
//   };
  
//   fetch('http://localhost:5678/api/users/login', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

