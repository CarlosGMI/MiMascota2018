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

//Obteniendo datos para El iniciar Sesion.................
const textoEmail = document.getElementById('textoEmail');
const textoPassword = document.getElementById('textoPassword');
const botonLogin = document.getElementById('botonLogin');
const botonSignUp = document.getElementById('botonSignUp');
const botonLogout = document.getElementById('botonLogout');

  				// añadiendo enventos para el  login
  				botonLogin.addEventListener('click', e => {
    			//guardando mail y pass..........
    				const email = textoEmail.value;
    				const pass = textoPassword.value;
    				const auth = firebase.auth();
    				// Sign in
    				const aux = auth.signInWithEmailAndPassword(email, pass);
    				aux.catch(e => console.log(e.message));   
  				});


 				// añadiendo enventos para el signup...........
  				botonSignUp.addEventListener('click', e => {
    			// guardando email y pass.............
    			
    			const email = textoEmail.value;
    			const pass = textoPassword.value;
   				const auth = firebase.auth();
    			// Sign in........................
    			const aux2 = auth.createUserWithEmailAndPassword(email, pass);
    			aux2.catch(e => console.log(e.message));
  				});


  				botonLogout.addEventListener('click', e => {
    			firebase.auth().signOut();
  				});

  				 // añadiendo enventos  en tiempo real
   				firebase.auth().onAuthStateChanged( firebaseUser => {
    			if(firebaseUser) {
      			console.log(firebaseUser);
      			botonLogout.classList.remove('hide');
      			botonSignUp.classList.remove('hide');
    			}
    			else
    			{
      			console.log('no logueado');
      			botonLogout.classList.add('hide');
      			botonSignUp.classList.add('hide');
    			}    
  				});

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
