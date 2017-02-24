function validarForm() 
{
	console.log("Validando formulario");
    var x = document.forms["formularioParticipacion"]["nombreUsuario"]["apellidoUsuario"]["telefonoUsuario"]["cedulaUsuario"].value;
    if (x == "") 
    {
        alert("Llena todos los campos requeridos por favor");
        return false;
    }
};