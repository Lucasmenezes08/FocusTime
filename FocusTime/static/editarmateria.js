document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-editar-materia");

    const nome = form.querySelector("input[name='nome-materia']");
    const horas = form.querySelector("input[name='horas']");
    const minutos = form.querySelector("input[name='minutos']");
    const segundos = form.querySelector("input[name='segundos']");
    const mensagemErro = document.getElementById("mensagem-erro");

    form.addEventListener("submit", function (e) {
        const nomeVal = nome.value.trim();
        const horasVal = horas.value.trim();
        const minutosVal = minutos.value.trim();
        const segundosVal = segundos.value.trim();

        let erro = false;

        if (!nomeVal || !horasVal || !minutosVal || !segundosVal) {
            e.preventDefault();
            erro = true;
            mensagemErro.textContent = "Preencha todos os campos antes de salvar.";
            mensagemErro.style.display = "block";
        } else {
            mensagemErro.style.display = "none";
        }

        [nome, horas, minutos, segundos].forEach(input => {
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
            } else {
                input.style.border = "";
            }
        });
    });
});
