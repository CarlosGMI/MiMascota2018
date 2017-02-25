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
console.log(window.location.pathname);

if(window.location.pathname == '/' || window.location.pathname == '/IniciarSe.html' || window.location.pathname == '/index.html' || window.location.pathname == '/IniciarSe.html' || window.location.pathname == '/participando.html' || window.location.pathname == '/participar.html' || window.location.pathname == '/perfil.html')
{	
	console.log("Estoy en el index");
	alIniciar();
	function alIniciar()
	{
		auth.onAuthStateChanged(function(user)
		{
			if(user)
			{
				console.log("Admin logeado");
				$("#botonParticipar").hide();
				$("#botonSubir").hide();
			}
			else
			{
				console.log("Admin no logeado");
				$("#menuPerfil").hide();
				$("#registrarButton").hide();
				$("#menuLogout").hide();
				console.log("escondí los botones");
			}
		});
	}
}

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
	    	var idParticipante = cedUsuario.value;
	    	cont = cont + 1;
		    if(cont<=3)
		    {	
		    	console.log("Obteniendo el archivo");
		    	//Obtener archivo y almacenarlo en el storage
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
			    function complete()
			    {
			    	var downloadURL = task.snapshot.downloadURL;
			    	//La foto será cargada en la base de datos
			    	if(cont == 1)
			    	{
			    		console.log("Subiendo imagen 1");
			    		db.ref('formulario/fotosMascota/'+idParticipante).update(
			    		{
			    			nombreImagen1: file.name,
			    			urlImg1: downloadURL
			    		});
			    	}
			    	else if(cont == 2)
			    	{
			    		console.log("Subiendo imagen 2");
			    		db.ref('formulario/fotosMascota/'+idParticipante).update(
			    		{
			    			nombreImagen2: file.name,
			    			urlImg2: downloadURL
			    		});
			    	}	
			    	else if(cont == 3)
			    	{
			    		console.log("Subiendo imagen 3");
			    		db.ref('formulario/fotosMascota/'+idParticipante).update(
			    		{
			    			nombreImagen3: file.name,
			    			urlImg3: downloadURL
			    		});
			    	}
			    });
			    console.log("contador "+cont);
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
	    		//window.alert("Contraseña equivocada! Vuelve a ingresar.");
	    		swal(
	    		{
					title: "Oops...",
				  	text: "Contraseña equivocada!",
				  	type: "warning",
				  	confirmButtonText: "OK",
				  	closeOnConfirm: false,
				  	closeOnCancel: false
				}),
				function(isConfirm)
				{	
					window.location.replace("IniciarSe.html");
  				}
			}
			else if(errorCode == 'auth/user-not-found')
	    	{
	    		//window.alert("Tu correo electrónico no se encuentra registrado.");
	    		swal(
	    		{
					title: "Oops...",
				  	text: "Usuario no encontrado!",
				  	type: "warning",
				  	confirmButtonText: "OK",
				  	closeOnConfirm: false,
				  	closeOnCancel: false
				}),
				function(isConfirm)
				{	
					window.location.replace("IniciarSe.html");
  				}
	    	}
	    	else
	    	{
	    		//window.alert("Error de autenticación");
	    		swal(
	    		{
					title: "Oops...",
				  	text: "Error de autenticación",
				  	type: "warning",
				  	confirmButtonText: "OK",
				  	closeOnConfirm: false,
				  	closeOnCancel: false
				}),
				function(isConfirm)
				{	
					window.location.replace("IniciarSe.html");
  				}
	    	}
	    });
	    auth.onAuthStateChanged(function(user)
		{
			if(user)
			{
				$("#menuPerfil").show();
				$("#registrarButton").show();
				$("#menuLogout").show();
				$("#loginButton").hide();
				$("#menuIniciarS").hide();
				$("#botonParticipar").hide();
				$("#botonSubir").hide();
				swal(
	    		{
					title: "Has iniciado sesión correctamente",
				  	timer: 1000,
				  	showConfirmButton: false
				});
				console.log("Admin logeado");
			}
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
	    	swal(
	    	{
				title: "Registrado correctamente!",
			  	timer: 1000,
			  	showConfirmButton: false
			});
	    	window.location.replace("index.html");
	    });
	});
}

//Logout
if(botonLogout)
{
	botonLogout.addEventListener('click', function() 
	{
	    auth.signOut();
	    $("#menuLogout").hide();
	    console.log("Cerré sesión");
	    swal(
	    {
			title: "Sesión finalizada con éxito.",
			timer: 1000,
			showConfirmButton: false
		});
	    window.location.replace("index.html");
	});
}

//Mandando toda la información del formulario
if(enviarDatos)
{
	enviarDatos.addEventListener("click", function()
	{
		if(cont == 3)
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
		}
		else
		{
			//window.alert("Sube 3 fotos de tu mascota!")
			console.log("Debo subir 3 fotos");
			swal(
	    	{
				title: "Sube 3 fotos de tu mascota!",
			  	timer: 1000,
			  	showConfirmButton: false
			});
		}
	});
}