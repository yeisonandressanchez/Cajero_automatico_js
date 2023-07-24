var cuentas = [
    { nombre: "yeison", saldo: 200, password: '123' },
    { nombre: "andres", saldo: 290, password: '123' },
    { nombre: "sanchez", saldo: 67, password: '123' }
];

var user = document.getElementById('username')
var password = document.getElementById('password')
var continuar = document.getElementById('btn_continuar')    
var vistaLogin = document.getElementById("login");
var btnConsulta = document.getElementById('btn_consulta')
var btnIngresa = document.getElementById('btn_ingresa')
var btnRetira = document.getElementById('btn_retira')
var btnSalir = document.getElementById('btn_salir')
var error = document.getElementById('error')
var bienvenida = document.getElementById('bienvenida')


var usuarioSeleccionado;

continuar.addEventListener('click', validarUsuario);
continuar.addEventListener('click', pruebaValidarC);
btnConsulta.addEventListener('click', consulta);
btnIngresa.addEventListener('click', ingresa);
btnRetira.addEventListener('click', retira);
btnSalir.addEventListener('click', salir)

var globalTotal = 0
var reglaTotales = 0

function validarUsuario() {
    switch (user.value) {
        case 'yeison':
            usuarioSeleccionado = user.value;
            pruebaValidarC
            break;

        case 'andres':
            usuarioSeleccionado = user.value;
            pruebaValidarC
            break;

        case 'sanchez':
            usuarioSeleccionado = user.value;
            pruebaValidarC
            break;

        default:
            error.innerHTML = 'Usuario incorrecto'
            user.value = '';
            password.value = ''
            user.focus();
            break;
    }
}

function pruebaValidarC() {
    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            if (cuentas[i].password === password.value) {
                bienvenida.innerHTML = 'Bienvenido a Sr. ' + cuentas[i].nombre

            } else {
                error.innerHTML = 'Error de Contraseña'
                password.value = '';
                user.value = '';
            }
        }
    }
}

function salir() {
    vistaHome.style.display = "none";
    vistaLogin.style.display = "block";
    user.value = '';
    user.focus();
    password.value = '';
}

function consulta() {
    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            if (globalTotal == 0) {
                Swal.fire({
                    title: 'Tu saldo actual es:',
                    text: '$' + cuentas[i].saldo + '.00 pesos',
                })
            } else {
                cuentas[i].saldo = globalTotal

                Swal.fire({

                    title: 'Tu saldo actual es:',
                    
                    text: '$' + cuentas[i].saldo + '.00 pesos',
                })
            }
        }
    }
}

function ingresa() {
    var saldoIngresado = 0

    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            var saldoActual = cuentas[i].saldo
            Swal.fire({
                title: "Ingresa un monto",
                input: 'text',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if(result.isConfirmed){
                    saldoIngresado = result.value
                    saldoIngresado = parseFloat(saldoIngresado)
                    if(globalTotal == 0){
                        reglaTotales =  saldoActual + saldoIngresado
                    }else{
                        reglaTotales = globalTotal + saldoIngresado
                    }
                    
                    if( reglaTotales > 990){
                        Swal.fire({
                                title:'Alerta',
                                text: 'Supera el valor requerido ($990)',
                            })
                    }else{
                        globalTotal = saldoActual += saldoIngresado
                        
                        if (saldoIngresado) {
                            Swal.fire({
                                title: 'Ha ingresado su saldo exitosamente',
                                text: '$' + saldoIngresado + '.00 pesos',
                                icon: 'info',
                                confirmButtonText: 'Aceptar',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    consulta()
                                }
                            })                      
                        }
                    }
                }else if(result.isDenied){
                    
                }               
                
            });

        }
    }
}

function retira() {
    var saldoIngresado = 0

    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            var saldoActual = cuentas[i].saldo
            Swal.fire({
                title: "Valor a Retirar",
                input: 'text',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    saldoIngresado = result.value
                    saldoIngresado = parseFloat(saldoIngresado)

                    if(globalTotal == 0){
                        reglaTotales =  saldoActual - saldoIngresado
                    }else{
                        reglaTotales = globalTotal - saldoIngresado
                    }

                    if (reglaTotales < 10) {
                        Swal.fire({
                            title:'Alerta',
                            text: 'Su cuenta debe contar con mas de $10.00 pesos',
                        })
                    } else {
                        globalTotal = saldoActual -= saldoIngresado

                        if (saldoIngresado) {
                            Swal.fire({
                                title: 'Valor a retirar',
                                text: '$' + saldoIngresado + '.00 pesos',
                                icon: 'info',
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    consulta()
                                }
                            }) 

                        }
                    }
                } else if(result.isDenied) {
                    
                }
            });

        }
    }
}