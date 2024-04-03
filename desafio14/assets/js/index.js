
const totales = document.querySelector(".totales");
const inputTarea = document.querySelector(".input-tarea");
const botonAgregarTareas = document.querySelector(".boton-agregar-tarea");
const listaTarea = document.querySelector(".lista-tareas");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineaTachar = "tarea-realizada"; 
const arrayTareas = [];
let id = 0;

function agregarTareas (tarea, id){
    const elementoTarea =  `<div id="tarea" class=block-tarea-${id}>
                                <p class="id-tarea">${id}</p>
                                <p class="tarea-${id}">${tarea}</p>
                                <div>
                                    <i class="far fa-circle" data="realizada" id="${id}"></i>
                                    <i class="fas fa-trash de" data="eliminada" id="${id}"></i>
                                </div>
                            </div>`
    listaTarea.insertAdjacentHTML("beforeend",elementoTarea);
}

botonAgregarTareas.addEventListener("click", ()=>{
    const tarea = inputTarea.value;
    if(tarea){
        id++;
        arrayTareas.push({
            nombre: tarea,
            id: id,
            realizada: false,
            eliminada: false
        });
        agregarTareas(tarea, id);
        calcularResulatados(arrayTareas); 
    }
    inputTarea.value = "";
});


listaTarea.addEventListener("click", function(e){
    const element = e.target;
    const elementData = element.attributes.data.value;
    const elementId = element.attributes.id.value;
    if (elementData === "realizada"){
       tacharTarea(element, elementId);
    }else if (elementData === "eliminada"){
        eliminarTarea(elementId);
    }
})


function tacharTarea(element, elementId){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    const tareaOk = document.querySelector(`.tarea-${elementId}`);
    tareaOk.classList.toggle(lineaTachar);
    for(let obj of arrayTareas){
        if (obj.id == elementId){
            obj.realizada ? obj.realizada = false : obj.realizada = true;
        }
    }
    calcularResulatados(arrayTareas);
}

function eliminarTarea(elementId){
    const tareaEliminar = document.querySelector(`.block-tarea-${elementId}`);
    for(let obj of arrayTareas){
        if (obj.id == elementId){
           obj.eliminada = true
           tareaEliminar.remove();
        }
    }
    calcularResulatados(arrayTareas);
}

function calcularResulatados(arrayTareas){
    const arrayCantidad = arrayTareas.filter(function (obj) { return obj.eliminada === false; });
    const arrayCompletadas = arrayCantidad.filter(function (obj) { return obj.realizada === true; });
    const arrayPorHacer = arrayCantidad.filter(function (obj) { return obj.realizada === false; });  
    const htmlTotales = `<p>Total: ${arrayCantidad.length}</p>
                         <p>Realizadas: ${arrayCompletadas.length}</p>
                         <p>Por hacer: ${arrayPorHacer.length}</p>`
    totales.innerHTML = htmlTotales;
}
