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



// Definimos las estaciones que están llenas
const responseFullStations = await fetch('http://localhost:8080/station/full');
const dataFullStations = await responseFullStations.json();

dataFullStations.forEach(estacion => {

    const elemento = document.createElement('div'); // creamos el contenedor de cada una de las estaciones

    elemento.textContent = estacion.name + ': ' + estacion.availableBikes + ' bicis disponibles';
    document.getElementById('full-stations').appendChild(elemento);
    i++;

});



// Definimos las estaciones que están vacías
const responseEmptyStations = await fetch('http://localhost:8080/station/empty');
const dataEmptyStations = await responseEmptyStations.json();

dataEmptyStations.forEach(estacion => {

    const elemento = document.createElement('div'); // creamos el contenedor de cada una de las estaciones

    elemento.textContent = estacion.name;
    document.getElementById('empty-stations').appendChild(elemento);
    i++;

});



// Mostramos todas las estaciones en la lista y filtramos
const responseStations = await fetch('http://localhost:8080/stations');
const dataStations = await responseStations.json();


const input = document.getElementById("searchStation");
input.addEventListener("input", () => {
    const resultado = dataStations.filter(estacion => { // creamos un array con las estaciones que cumplen la condición de que el nombre contenga el valor del input
    const elemento =  estacion.name[0].text;
    if (elemento.toLowerCase().startsWith(input.value.toLowerCase())) { // si el elemento que ha escrito el usuario coincide con el contenido de un nombre
        return true; // lo mantenemos en el array
    }
   
});
    createStationElement(resultado); // creamos el contenedor con el nombre
});

// Función para crear los elementos de las estaciones filtradas
function createStationElement(resultado) {
    const stationsContainer = document.getElementById('stations');
    stationsContainer.innerHTML = ''; // Limpiamos el contenedor antes de agregar los elementos filtrados
    resultado.forEach(estacion => {
        const elemento = document.createElement('a'); // creamos un botón para cada estación

        elemento.textContent = estacion.name[0].text;
        stationsContainer.appendChild(elemento); // mostramos el nombre de la estacion en el contenedor

        elemento.href = "/station.html?station_id=" + estacion.station_id; // redirigimos a la página de la estación con el id de la estación en la url

    });

}