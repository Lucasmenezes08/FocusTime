document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('myChart');
  if (!ctx) return;

  let labelsDoDjango = [];
  let dadosDoDjango = [];

  const labelsElemento = document.getElementById('chart-labels');
  const dataElemento = document.getElementById('chart-data');

  if (labelsElemento) {
    labelsDoDjango = JSON.parse(labelsElemento.textContent);
  }

  if (dataElemento) {
    dadosDoDjango = JSON.parse(dataElemento.textContent);
  }



  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labelsDoDjango,
      datasets: [{
        label: 'Horas Dedicadas',
        data: dadosDoDjango,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(201, 203, 207, 0.7)',
          'rgba(255, 87, 51, 0.7)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(201, 203, 207)',
          'rgb(255, 87, 51)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Distribuição do Tempo de Estudo', 
          font: {
                size: 20, 
          },
          align: 'center'
         
        },
        legend: {
          position: 'right',
          font: {
            size: 18,
          },
          labels: { 
            font: {
              size: 15,
            }
          }
        },
        datalabels: {
          color: '#fff',
          formatter: (value, context) => {
            return context.chart.data.labels[context.dataIndex];
          },
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
});



