// Inicializando Firebase
var config = 
{
	apiKey: "AIzaSyC9ZFYpocgv1cuYzyBx768ewsYgqs12g2g",
    authDomain: "mimascota2017-ff3b5.firebaseapp.com",
    databaseURL: "https://mimascota2017-ff3b5.firebaseio.com",
    storageBucket: "mimascota2017-ff3b5.appspot.com",
    messagingSenderId: "252069980494"
};

firebase.initializeApp(config);
var db = firebase.database();
var auth = firebase.auth();