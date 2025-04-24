document.querySelectorAll('.btn-consultar-materia').forEach(button => {
  button.addEventListener('click', () => {
      const id = button.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (modal) modal.classList.add('show');
  });
});

document.querySelectorAll('.btn-close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (modal) modal.classList.remove('show');
  });
})