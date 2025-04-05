const btn = document.getElementById('play');
const modal = document.getElementById('modal');
const btn_model = document.getElementById('btn-modal-submit');


let cliques = 0;

btn.addEventListener("click", function () {
    cliques++

    if (cliques % 2 == 0){
        modal.classList.add('show'); 
    }
});

btn_model.addEventListener("click", function () {
    modal.classList.remove('show'); 
});