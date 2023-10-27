import { Product } from "../class/product.js";

let getFormulaire = await fetch("templates/productformulaire.html.inc");
const templateFormulaire = await getFormulaire.text();


function renderFormulaire(data) {

    let templ = templateFormulaire;
    let content = document.querySelector("#content");
    content.innerHTML ="";
    
    if (stock <= cart.getQuantity()) {
        content.innerHTML = templ;
    } else {
        
    }
    console.log(stock);
}

export {renderFormulaire};