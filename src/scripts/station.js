import Chart from 'chart.js/auto';
import { API_URL } from './config.js';

const params = new URLSearchParams(window.location.search); // Obtener los parámetros de la URL
const stationId = params.get('station_id'); // Obtener el valor del parámetro 'station_id' y lo guardamos en una variable

const responseStationStatus = await fetch(`${API_URL}/station/${stationId}/status`); // obtenemos los datos de la estación desde el backend
const dataStationStatus = await responseStationStatus.json();



// Mostramos los datos más recientes del estado de cada estación

const stationTitle = document.getElementById('stationTitle');
    if (stationTitle) {
        stationTitle.textContent = dataStationStatus.name; // mostramos el nombre de la estación en el título
    }

const stationDate = document.getElementById('date');
    if (stationDate) {
        stationDate.textContent = 'Última actualización: ' + formatearFecha(dataStationStatus.date); // mostramos la fecha actual
    }

const stationAvailableBikes = document.getElementById('availableBikes');
    if (stationAvailableBikes) {
        stationAvailableBikes.textContent = 'Bicicletas disponibles: ' + dataStationStatus.availableBikes; // mostramos el número de bicicletas disponibles
    }

const stationAvailableDocks = document.getElementById('availableDocks');
    if (stationAvailableDocks) {
        stationAvailableDocks.textContent = 'Espacios disponibles: ' + dataStationStatus.availableDocks; // mostramos el número de espacios disponibles
    }

const stationCapacity = document.getElementById('capacity');
    if (stationCapacity) {
        stationCapacity.textContent = 'Capacidad:\n' + dataStationStatus.capacity; // mostramos la capacidad de la estación
    }

const stationRenting = document.getElementById('renting');
    if (stationRenting) {
        if(dataStationStatus.renting){ // Mostramos si la estación permite alquilar bicicletas o no
            stationRenting.textContent = 'Permite alquilar'
        } else {
            stationRenting.textContent = 'No permite alquilar'
        }
    }

const stationReturning = document.getElementById('returning');
    if (stationReturning) {
        if(dataStationStatus.returning){ // Mostramos si la estación permite devolver bicicletas o no
            stationReturning.textContent = 'Permite devolver'
        } else {
            stationReturning.textContent = 'No permite devolver'
        }
    }


function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
} 




// Mostramos los datos básicos de cada estación
const responseStation = await fetch(`${API_URL}/station/${stationId}`); // obtenemos los datos de la estación desde el backend
const dataStation = await responseStation.json();

const stationAddress = document.getElementById('address');
    if (stationAddress) {
        stationAddress.textContent = 'Dirección: ' + dataStation.address; // mostramos la dirección de la estación
    }

const stationIsChargingStation = document.getElementById('is_charging_station');
    if (stationIsChargingStation) {
        if(dataStation.is_charging_station){ // Mostramos si la estación es de carga o no
            stationIsChargingStation.textContent = 'Es una estación\n de carga'
        } else {
            stationIsChargingStation.textContent = 'No es una estación\n de carga'
        }
    }

const stationIsVirtualStation = document.getElementById('is_virtual_station');
    if (stationIsVirtualStation) {
        if(dataStation.is_virtual_station){ // Mostramos si la estación es virtual o no
            stationIsVirtualStation.textContent = 'Es una estación\n virtual'
        } else {
            stationIsVirtualStation.textContent = 'No es una\n estación virtual'
        }
    }

const stationPostCode = document.getElementById('post_code');
    if (stationPostCode) {
        stationPostCode.textContent = 'Código postal:\n ' + dataStation.post_code; // mostramos el código postal de la estación
    }




// Mostramos el historial de cada estación
const responseStationHistory = await fetch(`${API_URL}/station/${stationId}/history`); // obtenemos los datos de la estación desde el backend
const dataStationHistory = await responseStationHistory.json();

dataStationHistory.forEach((estado) => {

    const elemento = document.createElement('div'); // creamos el contenedor de cada uno de los estados

    let renting = estado.is_renting ? 'Alquilar🟢' : 'Alquilar🔴';
    let installed = estado.is_installed ? 'Instalada🟢' : 'Instalada🔴';
    let returning = estado.is_returning ? 'Devolver🟢' : 'Devolver🔴';


    elemento.textContent = fechaGrafica(estado.last_reported) + ' => ' + // mostramos la fecha actual
    'Bicis: ' + estado.num_vehicles_available +  
    ' | Huecos: ' + estado.num_docks_available + ' | ' + // mostramos el historial de la estación; 
     renting + ' | ' + installed + ' | ' + returning; // mostramos el estado de la estación;

   

    const status = document.getElementById('status');
    if (status) {
        status.appendChild(elemento);
    }

});


// Creamos la gráfica de los estados
const datosGrafica = dataStationHistory.map((estado) => { // construimos los datos para la gráfica de la estación, con la fecha y el número de bicicletas disponibles
        return {
            fecha: estado.last_reported,
            bicis: estado.num_vehicles_available
        };
    });

const fechas = datosGrafica.map((dato) => { // Creamos un nuevo array solo con las fechas
    return fechaGrafica(dato.fecha);
});

const bicis = datosGrafica.map((dato) => { // Creamos un nuevo array solo con las bicis
    return dato.bicis;
});


const stationChart = document.getElementById('stationChart').getContext('2d'); // creamos la gráfica de la estación

const chart = new Chart(stationChart, {
    type: 'line',
    data: {
        labels: fechas,
        datasets: [{
            label: 'Bicicletas Disponibles',
        data: bicis,
        borderColor: 'rgb(0, 179, 70)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
    }]
    },
    options: {
    
        scales: {
        x: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Fecha'
            }
        },
        y: {
            type: 'linear',
            beginAtZero: true,
            min: 0,

            ticks: {
                stepSize: 2 // Tamaño del paso de la cuadrícula
            }
        }
        
    },

    plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        },

    onClick: (e) => { // Mostramos los datos de cada punto
      const canvasPosition = getRelativePosition(e, chart);


      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    },

    maintainAspectRatio: false, // Permite que el CSS del contenedor controle la altura
  
  
}});

function fechaGrafica(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

