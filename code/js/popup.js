let btnProduct = document.querySelector(".btn_product");

btnProduct.addEventListener("click", handler_clickbtnProduct);


function handler_clickbtnProduct(ev) {
    let popUp_rupture = document.querySelector(".section_modal_rupture");
    let popUp_connexion = document.querySelector(".section_modal_connexion");

    popUp_rupture.classList.remove("activePopup");
    popUp_connexion.classList.remove("activePopup");
}