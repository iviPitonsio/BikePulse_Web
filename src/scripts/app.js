// Definimos el resumen de la red
const responseSummary = await fetch('http://localhost:8080/station/summary');
const dataSummary = await responseSummary.json();


document.getElementById('estaciones_totales').textContent = 'Estaciones totales: ' + dataSummary.totalStations;
document.getElementById('estaciones_activas').textContent = 'Estaciones operativas: ' + dataSummary.activeStations;
document.getElementById('bicis_totales').textContent = 'Bicis libres: ' + dataSummary.bikesAvailable;
document.getElementById('huecos_totales').textContent = 'Huecos libres: ' + dataSummary.docksAvailable;
document.getElementById('capacidad_total').textContent = 'Capacidad total: ' + dataSummary.totalCapacity;


// Definimos el ranking de las estaciones con más bicis disponibles
const responseRanking = await fetch('http://localhost:8080/station/ranking');
const dataRanking = await responseRanking.json();
let i = 1;

dataRanking.forEach(estacion => {

    const elemento = document.createElement('div'); // creamos el contenedor de cada una de las estaciones

    elemento.textContent = i + '. ' + estacion.name + ': ' + estacion.availableBikes + ' bicis disponibles';
    document.getElementById('ranking').appendChild(elemento);
    i++;

});