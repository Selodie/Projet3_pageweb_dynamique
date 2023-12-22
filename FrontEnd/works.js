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
            } else {
                figElement.style.display= "none";
            }
        }
    }
    
    // si clic sur logout dans le menu
    if(event.target.matches("#logout")){
        // efface le token du local storage
        localStorage.removeItem("token");
        // redirection vers la page d'accueil en étant déconnecté
        window.location.replace( "index.html");
    }


});

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
        let imgElement = document.createElement("img");
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

    let modal = document.getElementById("modal");
    // on récupère l'élément qui ouvre la modal
    let btn = document.getElementById("modify_text");

    // on recupère l'élément croix qui fermera la modal
    let close = document.getElementsByClassName("close")[0];

    // on récupère la div où vont s'afficher les img des projets
    let projet_gallery = document.getElementById("project_gallery");

    // boucle pour créer les img dans la modale
    for (const project of projects) {

        // création d'une div qui contient chaque img
        const div_img = document.createElement("div");
        div_img.classList.add("div_gall");  
        projet_gallery.appendChild(div_img);

        // création des img de la galerie
        const img_gallery = document.createElement("img");
        img_gallery.classList.add("img_gall");    
        img_gallery.src = project.imageUrl;
        div_img.appendChild(img_gallery);

        // création de l'icône pour la suppression
        const icon = document.createElement("i");
        icon.className= "fa-solid fa-trash-can"; 
        icon.dataset.figureId = project.categoryId;
        div_img.appendChild(icon);

        }

    // au clic la modal s'ouvre
    btn.onclick = function() {
    modal.style.display = "block";
    
    }
    // la modale se ferme quand on clic sur la croix
    close.onclick = function() {
        modal.style.display = "none";
    }

    // la modale se ferme si on clic en dehors de la croix
    window.onclick = function(event) {
        if (event.target == modal) {
             modal.style.display = "none";
        }
  }
   
});

let connect = localStorage.getItem("token");

if(connect){
    
    let editElements = document.querySelectorAll(".is_connected");
    for( let k = 0; k < editElements.length; k++ ){
        let editElement = editElements[k];
        editElement.style.display= "flex";
    }
    
    let disappearElements = document.querySelectorAll(".filter");
    // console.log(disappearElements);
    for(let l = 0; l < disappearElements.length; l++){
        let disappearElement = disappearElements[l];
        disappearElement.style.display= "none";
    }

}

















 














