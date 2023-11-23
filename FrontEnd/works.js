
// on récupère la div on va être créée la galerie
const divElement = document.getElementById("gall_img");

// Appel API avec Fetch
async function fetchProjects () {
    const response = await fetch ('http://localhost:5678/api/works', {
        method: 'GET',
        header: {
            "Accept": "aplication.json"
        },
    })

    // dans le cas d'une erreur affiche un message dans la console
    if (response.ok === true){
        return response.json();
    }
    throw new Error ('Impossible de contacter le serveur')
}

// on appel la fonction
fetchProjects().then(projects =>  {
    console.log(projects);

    // boucle pour créer éléments
    for (const project of projects) {

        // création balise figure
    const figureELement = document.createElement("figure");

    // création balise img, remplissage src et alt
    const imgElement = document.createElement("img");
    imgElement.src = project.imageUrl;
    imgElement.alt = project.title;

    // création balise figcaption
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = project.title;

    // on définit les enfants des parents
    divElement.appendChild(figureELement );
    figureELement.appendChild(imgElement);
    figureELement.appendChild(figcaptionElement);

    
   
}
});





 








//  autre manière call api
// fetch('http://localhost:5678/api/works',{
//     method: 'GET', 
//     header: {
//         "Accept": "application/json"
//     },
// })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));





// création galérie

