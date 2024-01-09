// url
let url = 'http://localhost:5678/api/works';

// récupération du token dans le local storage
let connect = localStorage.getItem("token");

// Création de la modale pour la suppression de projet
let modal = document.getElementById("modal");

// on récupère l'élément qui ouvre la modal de suppression
let btn = document.getElementById("modify_text");

// on recupère l'élément croix qui fermera la modal
let close = document.getElementsByClassName("close")[0];

// on récupère la div où vont s'afficher les img des projets
let projet_gallery = document.getElementById("project_gallery");

// on récupère la div de la modale d'ajout des projets
let add_modal = document.getElementById("add-project_modal");

// on récupère la div de la modale de suppression
let delete_modal = document.getElementById("delete_modal");

// on récupère la flèche de la modale d'ajout
let arrow = document.getElementById("arrow");


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


// Suppression des projets via la modale
   
    // si un clic sur l'icône de la poubelle alors on appelle la fonction qui supprime les projets
    if(event.target.matches(".fa-solid")){
         // on récupère le dataset avec l'id sur l'icône de la poubelle
        let iconId = event.target.dataset.iconId;
        console.log("suppression", iconId);
    
        event.preventDefault();
        deleteProject(iconId, connect).then(response =>  {
        //    console.log(response);
        });
    }

    // condition pour faire apparaître / disparaître les éléments dans la modal selon l'ajout ou la suppression de projet
    if(event.target.matches("#add_btn")){
        add_modal.style.display = "flex";
        delete_modal.style.display = "none";
        arrow.style.display = "block";

    }
    
    // condition pour faire un retour sur la précendente modale (de supp) lorsque l'on clic que la flèche
    if(event.target.matches("#arrow")){
        add_modal.style.display = "none";
        delete_modal.style.display = "flex"; 
        arrow.style.display = "none";
    }


    // Ajout des projets
    if(event.target.matches("#submit_picture")){
        // event.preventDefault();
       addProject(url).then(response => {

       })
    } 

});

// Appel API avec Fetch avec la méthode DELETE pour la suppression de projet
async function deleteProject (iconId, connect) {
    const delete_url = `http://localhost:5678/api/works/${iconId}`;
    const response = await fetch (delete_url, {
        method: 'DELETE',
        headers: {
            // "Accept": "aplication/json",
            "Authorization": `Bearer ${connect}`
        },
        

    })
    // dans le cas d'une erreur, affiche un message dans la console
    if (response.ok === true){

        // on supprime les projets de la page en ciblant leur class
        let suppFigureElement = document.querySelector(".fig");
        suppFigureElement.remove();

        // on supprime les projets de la modale en ciblant leur class
        let suppImgModal = document.querySelector(".div_gall");
        suppImgModal.remove();

        // console.log(response);
        alert("Le projet a bien été supprimé !")
        return response;
    }
    throw new Error ("La suppression à échoué !")
} 


// Appel API avec Fetch avec la méthode GET pour l'affichage des projets
async function fetchProjects () {
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

// Appel API avec fetch avec la méthode POST pour l'ajout de projets
async function addProject(url) {

// on récupère la valeur de l'input de l'image
let fileInput = document.getElementById("picture");

// on récupère la valeur de l'input title
let title_value = document.getElementById("title").value;

// on récupère la valeur de l'input category
let category_value = document.getElementById("category").value;

    let formData = new FormData();

    formData.append("image", fileInput.files[0]);
    formData.append("title", title_value);
    formData.append("category", category_value);

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    const response = await fetch (url, {
        method: 'POST',
        headers: {
            // Accept: "application/json",
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${connect}`
        },
        body: formData
    })

    if (response.ok === true){
        // console.log(response);
        alert("Le projet a bien été ajouté")
        return response;
    }
    throw new Error ("L'ajout à échoué !")

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

   
    // console.log("projects, %o", projects);

    // boucle pour créer les img dans la modale
    for (const project of projects) {

        // création d'une div qui contient chaque img
        const div_img = document.createElement("div");
        div_img.classList.add("div_gall");  
        projet_gallery.appendChild(div_img);

        // création des img de la galerie
        const img_gallery = document.createElement("img");
        img_gallery.classList.add("img_gall");
        img_gallery.dataset.imgId = project.id;    
        img_gallery.src = project.imageUrl;
        div_img.appendChild(img_gallery);

        // création de l'icône pour la suppression
        const icon = document.createElement("i");
        icon.className= "fa-solid fa-trash-can"; 
        icon.dataset.iconId = project.id;
        div_img.appendChild(icon);
        }

   
   
});


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

















 














