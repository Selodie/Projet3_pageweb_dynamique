// Appel API avec Fetch (pour works)
async function fetchProjects () {
    const url = 'http://localhost:5678/api/works';
    const response = await fetch (url, {
        method: 'GET',
        headers: {
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
    // console.log(projects);

// on récupère la div on va être créée la galerie
const divElement = document.getElementById("gall_img");

// boucle pour créer éléments
for (const project of projects) {

    // création balise figure
    const figureELement = document.createElement("figure");
    figureELement.classList.add("fig");
    
    // ajout d'un dataset avec comme valeur la categoryId correspondante
    figureELement.dataset.figureId = project.categoryId;

    // création balise img, remplissage src et alt
    const imgElement = document.createElement("img");
    imgElement.src = project.imageUrl;
    imgElement.alt = project.title;

    // création balise figcaption
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = project.title;


    // on définit les enfants des parents
    divElement.appendChild(figureELement);
    figureELement.appendChild(imgElement);
    figureELement.appendChild(figcaptionElement);   

}




// récupère la div où vont être situés les filtres de la galerie
const filterElement = document.getElementById("filters");

// création filtre tous
const everyElement = document.createElement("p");
// ajout d'une classe
everyElement.classList.add("filter", "every");
everyElement.innerHTML = "Tous";
everyElement.dataset.categoryId = 0;
filterElement.appendChild(everyElement);


// filtre/affichage de tous les éléments


// création filtre objets
const objectElement = document.createElement("p");
objectElement.classList.add("filter", "object");
objectElement.innerHTML = "Objets";
// ajout d'un attribut id 1
objectElement.dataset.categoryId = 1;
filterElement.appendChild(objectElement);


// création filtre appartements
const apartmentsElement = document.createElement("p");
apartmentsElement.classList.add("filter","appart");
apartmentsElement.innerHTML = "Appartements";
apartmentsElement.dataset.categoryId = 2;
filterElement.appendChild(apartmentsElement);

// création filtre hotels et restaurants
const hotelElement = document.createElement("p");
hotelElement.classList.add("filter", "hotel");
hotelElement.innerHTML = "Hôtels & restaurants";
hotelElement.dataset.categoryId = 3;
filterElement.appendChild(hotelElement);



// filtres
document.addEventListener("click", event=> {

// event delegation. Condition si le click se fait sur ces classes alors effectue le code dessous
    if(event.target.matches(".filter")){
      
        // on sélectionne toutes les classes .filter
    let filters = document.querySelectorAll(".filter");
    // target => element html surlequel on a cliqué => cible de l'évènement
    // event.target.classList.add("selected");
    


    
    // boucle pour réinitialiser la couleur des filtres et en aposer une nouvelle
    for (let j = 0; j < filters.length; j++){
        let filter = filters[j].style.backgroundColor = "white"; filters[j].style.color = "#1D6154";
        event.target.style.backgroundColor = "#1D6154";
        event.target.style.color = "white";

    }


        // on récupère la div on va être créée la galerie
    const divElement = document.getElementById("gall_img");


    // Récupération de la valeur de l'attribut dataset de données à partir du 'click'
    let categoryId = event.target.dataset.categoryId;

    // Récupération de la nodelist
    let figElements = document.querySelectorAll("figure.fig");
    
    // boucle pour parcourir la nodelist
    for( let i = 0; i < figElements.length; i++ ){
        let figElement = figElements[i];
        
        // Condition si categoryId à la même valeur que l'id du dataset figureId on affiche les travaux ayant la même valeur sinon
        // on ne les affiche pas. || => ou si catgeoryId est 0
        if( categoryId == figElement.dataset.figureId || categoryId == 0){
            figElement.style.display= "block";

        }else{
            figElement.style.display= "none";
        }
       
    }

       
    }
    
});

});











 














