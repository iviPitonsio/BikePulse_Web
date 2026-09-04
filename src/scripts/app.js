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

    elemento.textContent = i + '. ' + estacion.name + ': ' + estacion.availableBikes + ' 🚲';
    document.getElementById('ranking').appendChild(elemento);
    i++;

});



// Definimos las estaciones que están llenas
const responseFullStations = await fetch('http://localhost:8080/station/full');
const dataFullStations = await responseFullStations.json();

dataFullStations.forEach(estacion => {

    const elemento = document.createElement('li'); // creamos el contenedor de cada una de las estaciones

    elemento.textContent = estacion.name + ': ' + estacion.availableBikes + ' 🚲';
    document.getElementById('full-stations').appendChild(elemento);
    i++;

});



// Definimos las estaciones que están vacías
const responseEmptyStations = await fetch('http://localhost:8080/station/empty');
const dataEmptyStations = await responseEmptyStations.json();

dataEmptyStations.forEach(estacion => {

    const elemento = document.createElement('li'); // creamos el contenedor de cada una de las estaciones

    elemento.textContent = estacion.name;
    document.getElementById('empty-stations').appendChild(elemento);
    i++;

});



// Mostramos todas las estaciones en la lista y filtramos
const responseStations = await fetch('http://localhost:8080/stations');
const dataStations = await responseStations.json();


const input = document.getElementById("searchStation");
let vacio = false;

input.addEventListener("input", () => {

    if(input.value != ""){ // Si el usuario ha escrito cualquier caracter

        const resultado = dataStations.filter(estacion => { // creamos un array con las estaciones que cumplen la condición de que el nombre contenga el valor del input
        const elemento =  estacion.name[0].text;
        
        if (elemento.toLowerCase().startsWith(input.value.toLowerCase())) { // si el elemento que ha escrito el usuario coincide con el contenido de un nombre
            return true; // lo mantenemos en el array
        }
    
        });
        createStationElement(resultado); // creamos el contenedor con el nombre
    
    }else{
        createStationElement(); // si el usuario noe escribe nada, mandamos una lista vacía
    }

});


// Función para crear los elementos de las estaciones filtradas
function createStationElement(resultado) {
    const stationsContainer = document.getElementById('stations');

    stationsContainer.innerHTML = ''; // Limpiamos el contenedor antes de agregar los elementos filtrados
    resultado.forEach(async estacion => {
       
        const responseStationStatus = await fetch(`http://localhost:8080/station/${estacion.station_id}/status`); // obtenemos los datos de la capacidad desde el backend
        const dataStationStatus = await responseStationStatus.json();

        const elemento = document.createElement('a'); // creamos un botón para cada estación
        
        const mainContainer = document.createElement('div'); // creamos el contenedor principal
        const container01 = document.createElement('div'); // creamos un contenedor para el nombre de la estación y la capacidad
        
        const name = document.createElement('span'); // nombre
        const bikes = document.createElement('span'); // numero de bicis

        const container02 = document.createElement('div'); // contenedor para la barra
        const progress = document.createElement('div'); // barra


        name.textContent = estacion.name[0].text; // Guardamos el nombre de la estacion
        bikes.textContent = dataStationStatus.availableBikes + " / " + estacion.capacity + "🚲"; // Guardamos la cantidad de bicis y la capacidad maxima
        
        container01.appendChild(name); // añadimos el nombre de la estación al contenedor
        container01.appendChild(bikes); // añadimos el número de bicis disponibles al contenedor

        container02.appendChild(progress); // añadimos la barra a su contenedor

        mainContainer.appendChild(container01); // guardamos ambos contenedores en el principal
        mainContainer.appendChild(container02);

        elemento.appendChild(mainContainer); // añadimos el contenedor al botón de la estación

        stationsContainer.appendChild(elemento); // mostramos el nombre de la estacion en el contenedor


        let bar = dataStationStatus.availableBikes / estacion.capacity * 100; // guardamos el porcentaje de ocupación
        let colorBar; // determinamos el color de la barra en función del porcentaje

        if(bar >= 67){
            colorBar = 'green';
        }else if(bar < 67 && bar >= 33){
            colorBar = 'yellow';
        }else{
            colorBar = 'red';
        }
        

        // Determinamos las características de los contenedores y la barra
        mainContainer.classList.add('bg-black', 'rounded-xl', 'p-4', 'flex', 'flex-col', 'border-2',  'border-green-400', 'mb-5', 'w-full', 'max-w-md', 'w-125', 'transition-all', 'duration-300', 'hover:scale-105', 'hover:ring-green-400', 'hover:ring-2');
        
        container01.classList.add('flex', 'justify-between');
        container02.classList.add('w-full', 'bg-gray-800', 'rounded-xl', 'h-5');

        progress.classList.add('rounded-xl', 'h-5',);

        progress.style.width = bar+'%';
        progress.style.backgroundColor = colorBar;


        elemento.href = "/station.html?station_id=" + estacion.station_id; // redirigimos a la página de la estación con el id de la estación en la url
    
    });
}

