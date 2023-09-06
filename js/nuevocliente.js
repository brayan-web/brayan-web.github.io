
(function(){

    let DB;


    const formulario = document.querySelector('#formulario')
    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente)
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log("Hubo un error");
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }
    }

    function validarCliente(e){
        e.preventDefault();
        //Leer los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
                imprimirAlerta('Todos los campos son abligatorios', 'error');
                return;
        }

        //crea un objeto con la informacion

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }
        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror = function(){
            console.log("Hubo un error");
            imprimirAlerta('El correo que agrego ya existe', 'error');

        }

        transaction.oncomplete = function(){
            console.log("Cliente agregado");

            Swal.fire({
                icon: 'success',
                title: 'Cliente agregado correctamente',
                showConfirmButton: false,
                timer: 1500
              });

              setTimeout(() => {
                window.location.href = 'index.html';
              }, 3000)

        }
    }

    function imprimirAlerta(msg, tipo){
        const alerta = document.querySelector('.alerta');

        if(!alerta){
    //Crear alerta
    const divMsg = document.createElement('div');
    divMsg.classList.add('px-4', 'py-3', 'border', 'mt-5', 'rounded', 'relative', 'alerta');

    if(tipo === 'error'){
     divMsg.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
    }else{
     divMsg.classList.add('bg-teal-100', 'border-teal-400', 'text-teal-700')

    }

    divMsg.textContent = msg;
    formulario.appendChild(divMsg);

    setTimeout(() => {
        divMsg.remove();
    }, 3000)
        }
    
    }
})();