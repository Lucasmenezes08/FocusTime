document.addEventListener('DOMContentLoaded', () => {
    const colorModal = document.getElementById('modalCor'); 
    
   
    const closeModalBtn = colorModal ? colorModal.querySelector('.modal-cores-fechar') : null;
    const colorOptionsContainer = colorModal ? colorModal.querySelector('.color-options') : null;
    
    let currentMateriaId = null; 

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    function applyStoredColors() {
        const materiaContainers = document.querySelectorAll('.container_materia'); 
        materiaContainers.forEach(container => {
           
            if (container.id && container.id.startsWith('container-materia-')) {
                const materiaId = container.id.split('container-materia-')[1];
                if (materiaId) {
                    const storedColor = localStorage.getItem(`materiaCor_${materiaId}`);
                    if (storedColor) {
                        container.style.backgroundColor = storedColor;
                    }
                    
                }
            }
        });
    }

    document.querySelectorAll('.btn-selecionar-cores').forEach(button => {
        button.addEventListener('click', () => {
            currentMateriaId = button.dataset.id;
            if (colorModal) {
                colorModal.style.display = 'flex';
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (colorModal) {
                colorModal.style.display = 'none';
            }
            currentMateriaId = null;
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === colorModal) {
            if (colorModal) {
                colorModal.style.display = 'none';
            }
            currentMateriaId = null;
        }
    });

    if (colorOptionsContainer) {
        colorOptionsContainer.querySelectorAll('.color-box').forEach(box => {
            box.addEventListener('click', () => {
                if (!currentMateriaId) return;

                const selectedColor = box.dataset.color;
                
                const materiaContainerTarget = document.getElementById(`container-materia-${currentMateriaId}`);

                if (materiaContainerTarget) {
                    materiaContainerTarget.style.backgroundColor = selectedColor;
                    localStorage.setItem(`materiaCor_${currentMateriaId}`, selectedColor);

                    fetch(`/alterar-cor/${currentMateriaId}/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-CSRFToken': csrftoken,
                        },
                        body: `cor=${encodeURIComponent(selectedColor)}`
                    })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(errData => {
                                throw new Error(errData.mensagem || `Erro HTTP: ${response.status}`);
                            });
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.status === 'ok') {
                            console.log('Cor salva no backend:', data.nova_cor);
                        } else {
                            console.error('Erro ao salvar cor no backend:', data.mensagem);
                            alert(`Erro ao salvar cor: ${data.mensagem || 'Verifique o console para mais detalhes.'}`);
                        }
                    })
                    .catch(error => {
                        console.error('Erro na requisição fetch:', error);
                        alert(`Erro de comunicação: ${error.message}`);
                    });
                }

                if (colorModal) {
                    colorModal.style.display = 'none';
                }
                currentMateriaId = null;
            });
        });
    }

    applyStoredColors();
});