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
            let content = op.querySelector(".primary").textContent;
            op.addEventListener("click", () => {
                dropBtn.textContent = content;
            });
        });
    }
});
