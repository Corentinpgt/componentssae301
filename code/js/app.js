import { ProductCollection } from "./class/product-manager.js"
import { CartCollection } from "./class/cartitem-manager.js";
import { productRender, pageRender } from "./render/product-render";
import { renderPanier } from "./render/cart-render.js";
import { CartItem } from "./class/cartitem.js";

let M = {
    products: new ProductCollection(),
    cart: new CartCollection()
};

let V = {};

V.renderCard = function(data) {
    document.querySelector("#content").innerHTML = productRender(data);
}

V.renderPage = function(data) {
    document.querySelector("#content").innerHTML = pageRender(data);
}

V.renderCart = function(data) {
    document.querySelector("#content").innerHTML = renderPanier(data);
}



let C = {};


C.handlerClickNav = function (ev) {
    if (ev.target.tagName =="BUTTON") {
        let id = ev.target.dataset.id;
        V.renderCard(M.products.findByCategory(id));
    }
    C.init();
}

C.handlerClickCard = function (ev) {
    let id = ev.target.dataset.id;
    V.renderPage(M.products.find(id));
    C.init();
    let addtocartbtn = document.querySelector(".product__btn");
    addtocartbtn.addEventListener("click", C.handlerClickAddCart);

}

C.handlerClickAddCart = function (ev) {
    let id = ev.target.dataset.id;
    let prod = M.products.find(id);

    let idprod = prod.getId();
    if (M.cart.find(idprod)==undefined) {
        let select = document.querySelectorAll("select");
        let list = [];
        for (let s of select) {
            let value = s.value;
            let name = s.getAttribute("name");
            let shortlist = [ name, value];
            list.push(shortlist);
        }
        let p = new CartItem(prod);
        p.setSelect(list)
        M.cart.add(p);
    
        let barenav = document.querySelector(".list-links");
        barenav.addEventListener("click", C.handlerBareNav);
        }
    }

    


C.handlerQuantity = function (ev) {
    let use = ev.target.dataset.use;
    let id = ev.target.parentElement.dataset.id;
    if (use=="increase") {
        let cart = M.cart.find(id);
        let prod = cart.getProduct();
        if (prod.getQuantity()>cart.getQuantity()) {
            cart.plus();
        }
    }
    if (use=="decrease") {
        let cart = M.cart.find(id);
        if(cart.getQuantity()>0) {
            cart.minus();
        }
    }
    V.renderCart(M.cart);

    let btn = document.querySelectorAll(".productpanier__btn");
    btn.forEach(elt => {
        elt.addEventListener("click", C.handlerQuantity)
    });

    let barenav = document.querySelector(".list-links");
    barenav.addEventListener("click", C.handlerBareNav);



}

C.handlerBareNav = function(ev) {

    if (ev.target.id == "accueil") {
        V.renderCard(M.products.findAll());
        C.init();

    }
    if (ev.target.id == "panier") {
        V.renderCart(M.cart);
        let btn = document.querySelectorAll(".productpanier__btn");
        btn.forEach(elt => {
            elt.addEventListener("click", C.handlerQuantity)
        });
        

    }
    

}



C.init = async function() {
    let barenav = document.querySelector(".list-links");
    barenav.addEventListener("click", C.handlerBareNav);
    let nav = document.querySelector("#nav");
    nav.addEventListener("click", C.handlerClickNav);
    let pageacces = document.querySelectorAll(".productcard__btn");
    pageacces.forEach(elt => {
        elt.addEventListener("click", C.handlerClickCard);
    });
    

}

await M.products.load("https://mmi.unilim.fr/~perrault5/api/products");
V.renderCard(M.products.findAll());

C.init();
