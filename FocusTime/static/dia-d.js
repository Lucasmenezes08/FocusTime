document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let eventos = [];

    
    document.querySelectorAll('.content-lembretes .lembrete-item').forEach(item => {
    const titulo = item.dataset.titulo;
    const descricao = item.dataset.descricao;
    const hora = item.dataset.hora;
    const dataStr = item.dataset.data;

    const [ano, mes, dia] = dataStr.split('-').map(Number);

    eventos.push({
        nome: titulo,
        data: new Date(ano, mes - 1, dia),
        hora: hora,
        descricao: descricao
    });
});
    function criarDia(numero, eventos = []) {
        const dia = document.createElement('div');
        dia.className = 'dia';
        dia.textContent = numero;

        if (eventos.length > 0) {
            dia.classList.add('tem-evento');
            const marcador = document.createElement('div');
            marcador.className = 'evento-marcador';
            dia.appendChild(marcador);

            dia.addEventListener('mouseover', (e) => mostrarTooltip(e, eventos[0]));
            dia.addEventListener('mouseout', esconderTooltip);
        }

        return dia;
    }

    function mostrarTooltip(e, evento) {
        const tooltip = document.getElementById('evento-tooltip');
        tooltip.querySelector('.descricao').textContent = `${evento.nome}`;
        tooltip.querySelector('.data').textContent = `${evento.data.toLocaleDateString('pt-BR')} - ${evento.hora}`;
        
        tooltip.style.display = 'block';
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX - 100}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 80}px`;
    }

    function esconderTooltip() {
        document.getElementById('evento-tooltip').style.display = 'none';
    }

    function atualizarCalendario() {
        const ano = currentDate.getFullYear();
        const mes = currentDate.getMonth();
        
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        document.getElementById('mes-atual').textContent = `${meses[mes]} ${ano}`;

        const primeiroDia = new Date(ano, mes, 1).getDay();
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';

        for (let i = 0; i < primeiroDia; i++) {
            calendarDays.appendChild(criarDia(''));
        }

        for (let dia = 1; dia <= ultimoDia; dia++) {
            const dataAtual = new Date(ano, mes, dia);
            const eventosHoje = eventos.filter(evento => 
                evento.data.getDate() === dataAtual.getDate() &&
                evento.data.getMonth() === dataAtual.getMonth() &&
                evento.data.getFullYear() === dataAtual.getFullYear()
            );
            
            calendarDays.appendChild(criarDia(dia, eventosHoje));
        }
    }

    
    document.getElementById('mes-anterior').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        atualizarCalendario();
    });

    document.getElementById('mes-seguinte').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        atualizarCalendario();
    });

    
    atualizarCalendario();
    
});