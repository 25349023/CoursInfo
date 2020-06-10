window.addEventListener("load", () => {
    let buttons = document.querySelectorAll("aside table tbody tr");

    buttons.forEach((tr) => {
        tr.addEventListener("click", function () {
            this.querySelector("svg").classList.toggle("checked");
        });
    });
});
