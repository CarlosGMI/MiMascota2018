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
const nomMascota = document.getElementById("nombreMascota"); 
const edMascota = document.getElementById("edadMascota");
const histMascota = document.getElementById("historiaMascota");
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
	const petName = nomMascota.value;
	const petAge = edMascota.value;
	const petTale = histMascota.value;
	console.log("entré");

	db.ref('/formulario/participante/'+userid).set(
	{
		nombreParticipante: userName,
		apellidoParticipante: userApellido,
		telefonoParticipante: userTelf,
		cedulaParticipante:	userid
	});
	db.ref('/formulario/mascota/'+userid).set(
	{
		nombreMascota: petName,
		edadMascota: petAge,
		historiaMascota: petTale
	});
});
