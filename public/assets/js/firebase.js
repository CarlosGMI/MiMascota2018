// Inicializando Firebase
const config = 
{
	apiKey: "AIzaSyC9ZFYpocgv1cuYzyBx768ewsYgqs12g2g",
    authDomain: "mimascota2017-ff3b5.firebaseapp.com",
    databaseURL: "https://mimascota2017-ff3b5.firebaseio.com",
    storageBucket: "mimascota2017-ff3b5.appspot.com",
    messagingSenderId: "252069980494"
};
console.log("saaaaaaaaaaaas");
firebase.initializeApp(config);
const db = firebase.database();
const auth = firebase.auth();

//Obteniendo todos los valores del formulario de participación
const nomUsuario = document.getElementById("nombreUsuario");
const apeUsuario = document.getElementById("apellidoUsuario");
const teleUsuario = document.getElementById("telefonoUsuario");
const cedUsuario = document.getElementById("cedulaUsuario");
const enviarDatos = document.getElementById("botonSubmitForm");
console.log("leí datos");

//Mandando toda la información del formulario
enviarDatos.addEventListener("click", function()
{
	//Obteniendo el valor de los inputs en el formulario de participación
	const userName = nomUsuario.value;
	const userApellido = apeUsuario.value;
	const userTelf = teleUsuario.value;
	const userid = cedUsuario.value;
	console.log("entré");

	db.ref('/formulario/participante/'+userid).set(
	{
		nombreParticipante: userName,
		apellidoParticipante: userApellido,
		telefonoParticipante: userTelf,
		cedulaParticipante:	userid
	});
});
