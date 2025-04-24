document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal-principal");
    const btnAbrirModal = document.getElementById("btn-d-day");
    const form = document.getElementById("form-dia");

    btnAbrirModal.addEventListener("click", () => {
        modal.classList.add("show");
    });


    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
            form.reset();
        }
    });


    form.addEventListener("submit", function (e) {
        const nome = document.getElementById("nome-day").value.trim();
        const data = document.getElementById("data-day").value;

        if (!nome || !data) {
            e.preventDefault(); 
        
        } else {
            modal.classList.remove("show");
            form.reset();
        }
    });
});