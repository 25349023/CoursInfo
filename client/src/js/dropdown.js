window.addEventListener("load", () => {
    let dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dr) => {
        dr.addEventListener("click", function () {
            this.querySelector(".drpOptions").classList.toggle("active");
        });
    });

    for (let drp of dropdowns) {
        let dropBtn = drp.querySelector(".dropdownBtn .chosen");
        let options = drp.querySelectorAll(".option");
        options.forEach((op) => {
            let contents = [...op.querySelectorAll("span")].map(
                (sp) => sp.textContent
            );
            op.addEventListener("click", () => {
                dropBtn.textContent = contents.join(" ");
            });
        });
    }
});
