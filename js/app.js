//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];




//EVENT LISTENERS
eventListeners();

function eventListeners() {
    //Cuando el usuario crea un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; 

        console.log(tweets);

        crearHTML();

    });
}




//FUNCIONES
function agregarTweet(e) {
    e.preventDefault();

    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion...
    if(tweet === '') {
        mostrarError('Un tweet no puede ir vacio');
        return; // evita que se ejecuten mas lineas de codigo   
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet //se puede poner 'tweet' solamente
    }

    //añadir el tweet al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //una vez agregado vamos a crear el HTML
    crearHTML();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina elmensaje de error despues de 3 segundos
    setTimeout(() => {
       mensajeError.remove();
    }, 3000);

}

//muestra un listado de tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            //Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar. innerText = 'X';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton eliminar
            li.appendChild(btnEliminar);

            //Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agrega los Tweets actuales al Local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}



function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}