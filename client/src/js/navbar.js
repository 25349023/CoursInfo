window.addEventListener("load", () => {
    let navButton = document.querySelector("#navBtn");
    let navUl = document.querySelector("#navbar");
    navButton.addEventListener("click", () => {
        navUl.classList.toggle("expanded");
    });
});
