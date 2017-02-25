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

//Obteniendo datos para El iniciar Sesion.................
const textoEmail = document.getElementById('textoEmail');
const textoPassword = document.getElementById('textoPassword');
const botonLogin = document.getElementById('botonLogin');
const botonSignUp = document.getElementById('botonSignUp');
const botonLogout = document.getElementById('botonLogout');
const IniciarS = document.getElementById('IniciarS');
const Perfil = document.getElementById('Perfil');
// Obtener Elementos Para subir Archivos.............
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var cont = 0;
console.log("leí datos");

if(fileButton)
{
	fileButton.addEventListener('change', function(e) 
	{
	    if(!cedUsuario)
	    {
	    	window.alert("Debes insertar una cédula");
	    }
	    else
	    {
	    	cont = cont++;
		    if(cont<=3)
		    {	
		    	console.log("Obteniendo el archivo");
		    	//Obtener archivo
			    var file = e.target.files[0];
			    var storageRef = firebase.storage().ref('fotosMascota/'+idParticipante+'/'+file.name);
			    var task = storageRef.put(file);
			    //Actualizar barra progreso
			    task.on('state_changed', function progress(snapshot) 
			    {
			        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			        uploader.value = percentage;
			    },
			    function error(err){
			    },
			    function complete(){
			    });
			}
			else
			{
				window.alert("Solo puedes subir 3 imágenes");
			}
    	}
	});
}

//Sign in
if(botonLogin)
{
	botonLogin.addEventListener('click', function()
	{
	    const email = textoEmail.value;
	    const pass = textoPassword.value;
	    auth.signInWithEmailAndPassword(email, pass).catch(function(error)
	    {
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	if(errorCode == 'auth/wrong-password')
	    	{
	    		window.alert("Contraseña equivocada! Vuelve a ingresar.");
	    	}
	    	else if(errorCode == 'auth/user-not-found')
	    	{
	    		window.alert("Tu correo electrónico no se encuentra registrado.");
	    	}
	    	else
	    	{
	    		window.alert("Error de autenticación");
	    	}
	    }).then(function()
	    {
	    	console.log("Me estoy logeando");
	    	window.location.replace("index.html");
	    });	
	});
}

//Sign Up
if(botonSignUp)
{
	botonSignUp.addEventListener('click', function() 
	{
		const email = textoEmail.value;
	    const pass = textoPassword.value;
	    auth.createUserWithEmailAndPassword(email, pass).then(function()
	    {
	    	console.log("Me estoy registrando");
	    	window.location.replace("index.html");
	    });
	});
}

//Logout
if(botonLogout)
{
	botonLogout.addEventListener('click', function() 
	{
	    auth().signOut();
	    console.log("Cerré sesión");
	    window.location.replace("index.html");
	});
}

//Eventos en tiempo real
//auth().onAuthStateChanged(function(user)
//{
//	if(user)
//	{
//		console.log("Admin logeado");
		/*console.log(firebaseUser);
      	botonLogout.classList.remove('hide');
      	botonSignUp.classList.remove('hide');
      	IniciarS.classList.add('hide');
      	Perfil.classList.remove('hide');*/
//	}
//	else
//	{
//		console.log("Admin no logeado")
		/*console.log('no logueado');
      	botonLogout.classList.add('hide');
      	botonSignUp.classList.add('hide');
      	IniciarS.classList.remove('hide');
        Perfil.classList.add('hide');*/
//	}
//});  */

//Mandando toda la información del formulario
if(enviarDatos)
{
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
		}).then(function()
		{
			window.location.replace("participando.html");
		});
	});
}
