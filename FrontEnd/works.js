// url
let url = 'http://localhost:5678/api/works';

// récupération du token dans le local storage
let connect = localStorage.getItem("token");

// on récupère la div où vont s'afficher les img des projets
let projet_gallery = document.getElementById("project_gallery");


// filtres
document.addEventListener("click", event=> {

    // event delegation. Condition si le click se fait sur ces classes alors effectue le code dessous

    // fonction pourla fermeture de la modale
    let close_modal = function(){
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    }
    let color_btn_change = function(){
        event.target.style.backgroundColor = "#1D6154";
        event.target.style.color = "white"; 
    }

    // event pour faire apparaître la modal
    if(event.target.matches("#modify_text")){
        // Création de la modale pour la suppression de projet
        let modal = document.getElementById("modal");
        modal.style.display = "block";
    }

    // event pour fermer la modal
    if(event.target.matches(".close")){
        close_modal();
    }

    // fermeture de la modal si clic en dehors de celle-ci
    if (event.target == modal) {
        close_modal();
    }

    // ajout et retrait d'une class au clic des filtres pour définir la couleur du texte et le backgroud color
    if(event.target.matches(".filter")){
        // on recupère le premier element avec la classe selected
        let filter = document.getElementsByClassName("selected")[0];
        // on retire la class selected  
            filter.classList.remove("selected");
            // on ajoute la class selected
        event.target.classList.add("selected");

        
        // color_btn_change()
        // on sélectionne toutes les classes .filter
        // let filters = document.querySelectorAll(".filter");
        // target => element html surlequel on a cliqué => cible de l'évènement
        // event.target.classList.add("selected");
        
        // boucle pour réinitialiser la couleur des filtres et en aposer une nouvelle
        // for (let j = 0; j < filters.length; j++){
        //     let filter = filters[j].style.backgroundColor = "white"; filters[j].style.color = "#1D6154";
        //     color_btn_change()
        // }


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
        // empêche le comportement par défaut
        event.preventDefault();

        deleteProject(iconId, connect).then(response =>  {
        });

    }

    // condition pour faire apparaître / disparaître les éléments dans la modal selon l'ajout ou la suppression de projet
    let appear_add_modal = function(){
        let add_modal = document.getElementById("add-project_modal"); 
        add_modal.style.display = "flex";
        let delete_modal = document.getElementById("delete_modal");
        delete_modal.style.display = "none";
        let arrow = document.getElementById("arrow");
        arrow.style.display = "block";
    }
    if(event.target.matches("#add_btn")){
        let add_modal = function(){
            appear_add_modal();
        }
        add_modal();
    }
    
    // condition pour faire un retour sur la précendente modale (de supp) lorsque l'on clic que la flèche
    // création d'une fonction qui contient le retour en arrière dde la modal ajout à la modal suppression
    let return_back = function(){
        // on récupère la div de la modale d'ajout des projets
        let add_modal = document.getElementById("add-project_modal");
        add_modal.style.display = "none";
        // on récupère la div de la modale de suppression
        let delete_modal = document.getElementById("delete_modal");
        delete_modal.style.display = "flex"; 
        // on récupère la flèche de la modale d'ajout
        let arrow = document.getElementById("arrow");
        arrow.style.display = "none";
    }
    // event sur la flèche de retour arrière de la modale
    if(event.target.matches("#arrow")){
        let action_arrow = function() {
        return_back();
        }
        action_arrow();  
    }


    // Ajout des projets
    if(event.target.matches("#submit_picture")){
        color_btn_change()
        // event.preventDefault();

       addProject(url).then(newProjects => {
        // window.location.replace( "index.html");
        close_modal();
        

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
         let suppFigureElements = document.querySelectorAll(".fig");
         // let aaa = document.querySelectorAll('figure[data-img-id="'+iconId+'"]');

 
         for(let l = 0; l < suppFigureElements.length; l++){
             let deleteFigureElement = suppFigureElements[l];
             // console.log(deleteElement);
             let id_project = suppFigureElements[l].dataset.projectId;
             // console.log(id_project);
             if(id_project == iconId){
                 deleteFigureElement.remove()
             }
         }
 
         // on supprime les projets de la modale en ciblant leur class
         let deleteModalImages = document.querySelectorAll(".div_gall");
        //  boucle pour parcourir les éléments
         for(let m = 0; m < deleteModalImages.length; m++){
             let deleteModalImage = deleteModalImages[m];
             // console.log(deleteModalImage);
             let idModalImages = deleteModalImages[m].dataset.imgId;
             // console.log(idModalImages);
             if(idModalImages == iconId){
                 deleteModalImage.remove()
             }
         }
       
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
    let fileInput = document.getElementById("image");

    // on récupère la valeur de l'input title
    let title_value = document.getElementById("title").value;

    // on récupère la valeur de l'input category
    let category_value = document.getElementById("category").value;

    let formData = new FormData();

    formData.append("image", fileInput.files[0]);
    formData.append("title", title_value);
    formData.append("category", category_value);
    // console.log(fileInput.files[0]);


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

        // on récupère le résultat de la promesse qui est convertie en json
        let data = await response.json();

        const divElement = document.getElementById("gall_img");
        
        // ajout du projet dans la page html
        // création balise figure
        const figureELement = document.createElement("figure");
        figureELement.classList.add("fig");
        
        // ajout d'un dataset avec comme valeur la categoryId correspondante
        figureELement.dataset.figureId = data.categoryId;
        // ajout d'un datatset avec comme valeur l'id du projet
        figureELement.dataset.projectId = data.id;
 
        // création balise img, remplissage src et alt
        let imgElement = document.createElement("img");
        imgElement.src = data.imageUrl;
        imgElement.alt = data.title;
        
 
        // création balise figcaption
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = data.title;
 
        // on définit les enfants des parents
        divElement.appendChild(figureELement);
        figureELement.appendChild(imgElement);
        figureELement.appendChild(figcaptionElement);

        // ajout du projet dans la modale
         // création d'une div qui contient chaque img
        const div_img = document.createElement("div");
        div_img.classList.add("div_gall"); 
         div_img.dataset.imgId = data.id;  
         projet_gallery.appendChild(div_img);
 
         // création des img de la galerie
        const img_gallery = document.createElement("img");
        img_gallery.classList.add("img_gall");
        img_gallery.src = data.imageUrl;
        div_img.appendChild(img_gallery);
 
         // création de l'icône pour la suppression
        const icon = document.createElement("i");
        icon.className= "fa-solid fa-trash-can"; 
        icon.dataset.iconId = data.id;
        div_img.appendChild(icon);

        alert("Le projet a bien été ajouté")
        return response;
    }
    throw alert("Une erreur est survenue, veuillez vérifier les champs à remplir")
    

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
        // ajout d'un datatset avec comme valeur l'id du projet
        figureELement.dataset.projectId = project.id;

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
        div_img.dataset.imgId = project.id;  
        projet_gallery.appendChild(div_img);

        // création des img de la galerie
        const img_gallery = document.createElement("img");
        img_gallery.classList.add("img_gall");
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

















 














