// url des projets
let url = 'http://localhost:5678/api/works';

// récupération du token dans le local storage
let connect = localStorage.getItem("token");

// fonction pour la création d'éléments html pour les projets
let createHtmlProject = function(project){
    // on récupère la div où va être créée la galerie
    const divElement = document.getElementById("gall_img");

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

// fonction pour la création de la modale
let createElementModal = function(project){
    // on récupère la div où vont s'afficher les img des projets
    let projetGallery = document.getElementById("project_gallery");

    // création d'une div qui contient chaque img
    const divImg = document.createElement("div");
    divImg.classList.add("div_gall"); 
    divImg.dataset.imgId = project.id;  
    projetGallery.appendChild(divImg);

    // création des img de la galerie
    const imgGallery = document.createElement("img");
    imgGallery.classList.add("img_gall");
    imgGallery.src = project.imageUrl;
    divImg.appendChild(imgGallery);

    // création de l'icône pour la suppression
    const icon = document.createElement("i");
    icon.className= "fa-solid fa-trash-can"; 
    icon.dataset.iconId = project.id;
    divImg.appendChild(icon);
}


// Appel API avec Fetch avec la méthode GET pour l'affichage des projets
async function fetchProjects () {
    const response = await fetch (url, {
        method: 'GET',
        headers: {
            // on spécifie le format json
            "Accept": "aplication/json"
        },
    })
    
    if (response.ok === true){
        return await response.json();
    }
    // dans le cas d'une erreur affiche un message dans la console
    throw new Error ('Impossible de contacter le serveur')
}

// on appelle la fonction
fetchProjects().then(projects =>  {

    // boucle pour créer éléments html de la page et de la modale
    for(let p = 0; p < projects.length; p++){
        let project = projects[p];

        // on appel la fonction pour la création html des projets ( pour chacun des projets) dans la page
        createHtmlProject(project);
        createElementModal(project);
    }
});

// Appel API avec Fetch avec la méthode DELETE pour la suppression de projet
async function deleteProject (iconId, connect) {
    const delete_url = `http://localhost:5678/api/works/${iconId}`;
    const response = await fetch (delete_url, {
        method: 'DELETE',
        headers: {
            // il faut être connecté
            "Authorization": `Bearer ${connect}`
        },
    })
    if (response.ok === true){

         // on supprime les projets de la page en ciblant leur class
         let suppFigureElements = document.querySelectorAll(".fig");
 
        //  boucle pour supprimer les éléments html de la page
         for(let l = 0; l < suppFigureElements.length; l++){
            let deleteFigureElement = suppFigureElements[l];
            // on définit dans une variable le dataset avec l'id du projet pour chaque projet
            let id_project = suppFigureElements[l].dataset.projectId;
            if(id_project == iconId){
                deleteFigureElement.remove()
            }
         }
 
         // on supprime les projets de la modale en ciblant leur class
         let deleteModalImages = document.querySelectorAll(".div_gall");

        //  boucle pour parcourir les éléments et les supprimer
         for(let m = 0; m < deleteModalImages.length; m++){
            let deleteModalImage = deleteModalImages[m];
            let idModalImages = deleteModalImages[m].dataset.imgId;
            if(idModalImages == iconId){
                deleteModalImage.remove()
            }
         }
       
        alert("Le projet a bien été supprimé !")
        return response;
    }
     // dans le cas d'une erreur, affiche un message dans la console
    throw new Error ("La suppression à échoué !")
} 

// Appel API avec fetch avec la méthode POST pour l'ajout de projets
async function addProject(url) {

    // on récupère la valeur de l'input de l'image
    let fileInput = document.getElementById("image");

    // on récupère la valeur de l'input title
    let titleValue = document.getElementById("title").value;

    // on récupère la valeur de l'input category
    let categoryValue = document.getElementById("category").value;

    // création d'un objet formData contenant un ensemble de paires clé/valeur pour les champs du formualaire qui seront envoyés au serveur
    let formData = new FormData();
    // paire clé/valeur pour l'image. on récupère le premier fichier selectionné
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleValue);
    formData.append("category", categoryValue);

    const response = await fetch (url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${connect}`
        },
        body: formData
    })


    if (response.ok === true){

        // on récupère le résultat de la promesse qui est convertie en json
        let project = await response.json();
        // on appel la function pourla creation html des projets
        createHtmlProject(project);
        // on appel la fonction pour la création html de la modale
        createElementModal(project);

        alert("Le projet a bien été ajouté")
        return response;
    }
    throw alert("Une erreur est survenue, veuillez vérifier les champs à remplir")
    

}


// visualisation image dans la modal d'ajout de projet
const inputImg = document.getElementById("image");

inputImg.addEventListener('change', function(){
    const fichier = this.files[0];

    if(fichier) {
        // création d'un objet fileReader pour lire le contenu du fichier
        const analyser = new FileReader();
        // lis les données binaires et les encode en chaîne de caractère
        analyser.readAsDataURL(fichier);
        // fait apparaître ou disparaître des éléments
        const viewImg = document.querySelector(".imgview");
        const divImgView = document.querySelector(".image_viewing");
        const hideElements = document.getElementById("adding_elements");
        viewImg.style.display = "flex";
        divImgView.style.display = "flex";
        hideElements.style.display = "none";
        // écouteur d'évènement pour détecter le chargement complet du contenu du fichier et quand chargement terminé, définition de 
        // l'attribu src avec le résultat du chargement cad le data url de l'image
        analyser.addEventListener('load', function(){
            viewImg.setAttribute('src', this.result);
        })
    }
})

// mise en place d'un écouteur d'évènement sur le click dans la page
document.addEventListener("click", event=> {
// fonctions utilisées dans les conditions

    // fonction pour faire apparaître les éléments dans la modal d'ajout des projets
    let appearAddModal = function(){
        let addModal = document.getElementById("add-project_modal"); 
        addModal.style.display = "flex";
        let deleteModal = document.getElementById("delete_modal");
        deleteModal.style.display = "none";
    }

    // fonction pour faire un retour sur la précendente modale (de supp) lorsque l'on clic que la flèche
    let returnBack = function(){
        // on récupère la div de la modale d'ajout des projets
        let addModal = document.getElementById("add-project_modal");
        addModal.style.display = "none";
        // on récupère la div de la modale de suppression
        let delete_modal = document.getElementById("delete_modal");
        delete_modal.style.display = "flex"; 
    }

    // fonction pour la fermeture de la modale
    let closeModal = function(){
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    }
    // fonction pour le changement de couleur de bouton
    let colorBtnChange = function(){
        event.target.style.backgroundColor = "#1D6154";
        event.target.style.color = "white"; 
    }

// Condition si le click se fait sur ces classes alors effectue le code dessous

    // cliquer sur le bouton +ajouter une photo équivaut à cliquer sur l'input de type file qui est caché dans le cas où
    // l'id est égale à "btn_picture"
    if(event.target.id === "btn_picture"){
        document.getElementById("image").click();
    }

    // event pour faire apparaître la modal
    // si l'event du clic se fait sur cet id modif_text, le code dessous s'éxecute
    if(event.target.id === "modify_text"){
        // Création de la modale pour la suppression de projet
        let modal = document.getElementById("modal");
        modal.style.display = "flex";
    }

    // event pour fermer la modal
    if(event.target.matches(".close")){
        // on appel la fonction qui ferme la modale
        closeModal();
    }
    // fermeture de la modal si clic en dehors de celle-ci
    if (event.target == modal) {
        closeModal();
    }
    // ajout et retrait d'une class au clic des filtres pour définir la couleur du texte et le backgroud color
    if(event.target.matches(".filter")){
        // on recupère le premier element avec la classe selected
        let filter = document.getElementsByClassName("selected")[0];
        // on retire la class selected  
        filter.classList.remove("selected");
        // on ajoute la class selected
        event.target.classList.add("selected");
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
    if(event.target.id ==="logout"){
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

        deleteProject(iconId, connect);

    }

    // pour faire apparaître la modale d'ajout de projet
    if(event.target.id === "add_btn"){
        appearAddModal();
    }

    // event sur la flèche de retour arrière de la modale
    if(event.target.id === "arrow"){
        returnBack();
    }

    // Ajout des projets
    if(event.target.id === "submit_picture"){
        colorBtnChange()

        addProject(url).then(newProjects => {
            closeModal();

            // on vide les valeurs des input
            let showDivImgChoice = document.getElementById("adding_elements");
            showDivImgChoice.style.display = "flex";
            let fileInput = document.querySelector(".image_viewing");
            fileInput.style.display ="none";
            let titleValue = document.getElementById("title");
            titleValue.value ="";
            let categoryValue = document.getElementById("category");
            categoryValue.value = "";
       })
    } 
});

// condition lors de la connection (login)
if(connect){
    // boucle pour faire apparaître les éléments html dont la classe est "is_connected"
    let editElements = document.querySelectorAll(".is_connected");
    for( let k = 0; k < editElements.length; k++ ){
        let editElement = editElements[k];
        editElement.style.display= "flex";
    }
    // boucle pour faire disparaître les éléments html portant la classe filter
    let disappearElements = document.querySelectorAll(".filter");
    for(let l = 0; l < disappearElements.length; l++){
        let disappearElement = disappearElements[l];
        disappearElement.style.display= "none";
    }
}

















 














