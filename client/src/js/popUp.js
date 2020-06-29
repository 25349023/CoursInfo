window.addEventListener("load", function () {
    let popupBtns = document.querySelectorAll(".popup");
    popupBtns.forEach((pop) => {
        let popContent = document.querySelector(pop.dataset.target);

        pop.addEventListener("click", () => {
            popContent.classList.add("active");
        });
    });

    let popupContents = document.querySelectorAll(".popupContent");
    popupContents.forEach((pc) => {
        // if (pc.classList.contains("static")) {
        //     pc.addEventListener("click", () => {
        //         pc.classList.remove("active");
        //     });
        // }

        pc.querySelector(".close").addEventListener("click", () => {
            pc.classList.remove("active");
        });
    });

    let popupWindows = document.querySelectorAll(".static .popupWindow");
    popupWindows.forEach((pw) => {
        pw.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });
});
