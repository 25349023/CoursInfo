window.addEventListener("load", () => {
    let links = document.querySelectorAll(".listing table tbody tr");

    links.forEach((tr) => {
        tr.addEventListener("click", linkOnClick(tr.dataset.href));
    });
});

function linkOnClick(href) {
    return () => {
        location.href = href;
    };
}
