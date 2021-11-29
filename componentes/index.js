// creando una función llamada loadSongs donde tenemos nuestra searchQuery
function loadSongs(searchQuery) {
  /* estamos obteniendo la información de la web
      Uso de un método para obtener información de RapidAPI
      La API Fetch proporciona una interfaz JavaScript para acceder y manipular partes de la canalización HTTP,
      como solicitudes y respuestas.
      También proporciona un método fetch () global que proporciona una forma sencilla y lógica de obtener recursos de forma asíncrona a través de la red.
      limitar la cadena de consulta a 6 parámetros ("límite = 6 & q")
  */

  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?limit=8&q=" + searchQuery, {
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "14d1c66842mshd28de8bfb0a12c2p188cccjsne4c4f35e41c9"
      // obtenemos encabezados de => https://rapidapi.com/deezerdevs/api/deezer-1 (busque Rapid Api y Deezer API)
    } }) // .entonces la función maneja la respuesta y luego la devolvemos a un Json ("El objeto JSON contiene métodos para analizar la notación de objetos JavaScript (JSON) y convertir valores a JSON").
  // El método then () devuelve una Promesa.
  // Toma hasta dos argumentos: funciones de devolución de llamada para las causas de "éxito" y "fracaso" de la Promesa.


  .then(function (response) {
    return response.json();
  }).then(function (songsResponse) {
    // console.log(songsResponse)


    // para poner información dentro de un div

    var div = "\n            <h3> " + searchQuery + "</h3>\n            <hr>\n            <div class ='row'>";

    var songs = songsResponse.data;
    songs.forEach(function (song) {
      // la canción que queremos mostrar // usando los literales de plantilla $ {}
      div += "\n              <div class=\"col-sm-4 col-md-2 col-lg-1 song\">\n              <img src= \"" + song.album.cover + "\" />\n              <span>" + song.title + "</span>\n              \n              </div>\n               ";
    });
    // obteniendo la referencia de estos álbumes con
    document.querySelector("#albums").innerHTML += div + "</div>";
  });
}

window.onload = function () {
  loadSongs("DLD");
  loadSongs(" League of Legends");
  loadSongs("metallica");
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function (reg) {
    return console.log('Registro de SW exitoso', reg);
  }).catch(function (err) {
    return console.warn('Error al tratar de registrar el sw', err);
  });
}