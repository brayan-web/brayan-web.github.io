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