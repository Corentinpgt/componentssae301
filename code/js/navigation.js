let btn = document.querySelector(".btn-menu");
btn.addEventListener("click", handler__menu_responsive);
let list = document.querySelector(".list-links");
let btnspan = document.querySelector(".btn-menu__bar");
let classes = list.classList;

function handler__menu_responsive() {
    
    if (classes.contains("notactive")) {
        classes.remove("notactive");
        classes.add("active");
        btn.classList.add('active');
        btnspan.classList.add('active');
    } else if (classes.contains("active")) {
        classes.remove("active");
        classes.add("notactive");
        btn.classList.remove('active');
        btnspan.classList.remove('active');
    }
}

let listItem = document.querySelectorAll(".list__item_link");

listItem.forEach(element => {
    element.addEventListener("click", () => {
        classes.remove("active");
        classes.add("notactive");
        btn.classList.remove("active");
        btnspan.classList.remove("active");
    });
});
