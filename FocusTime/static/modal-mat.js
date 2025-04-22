document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (modal) modal.style.display = 'flex';
    });
  });

  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (modal) modal.style.display = 'none';
    });
  });
