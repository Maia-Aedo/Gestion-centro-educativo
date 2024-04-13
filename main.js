function restricciones() {
    // obtiene input de form para hacer las restricciones
    const opcion = document.getElementById('profesion').value
    // sin value al final porque obtiene el elemento, no el valor del input
    const nombre = document.getElementById("nombre")
    const apellidos = document.getElementById("apellidos")
    const numeroID = document.getElementById("numeroID")
    const estadoCivil = document.getElementById("estadoCivil")
    const anioIncorporacion = document.getElementById("anioIncorporacion")
    const numDespacho = document.getElementById("numDespacho")
    const curso = document.getElementById("curso")
    const departamento = document.getElementById("departamento")
    const seccion = document.getElementById("seccion")

    if (opcion == 'estudiante') {
        // los campos del formulario se encontraran desactivados por boolean
        nombre.disabled = false;
        apellidos.disabled = false;
        numeroID.disabled = false;
        estadoCivil.disabled = false
        anioIncorporacion.disabled = true;
        numDespacho.disabled = true;
        curso.disabled = false;
        departamento.disabled = true;
        seccion.disabled = true;
    } else if (opcion == 'empleado') {
        nombre.disabled = false;
        apellidos.disabled = false;
        numeroID.disabled = false;
        estadoCivil.disabled = false
        anioIncorporacion.disabled = false;
        numDespacho.disabled = false;
        curso.disabled = true;
        departamento.disabled = true;
        seccion.disabled = true;
    } else if (opcion == 'profesor') {
        nombre.disabled = false;
        apellidos.disabled = false;
        numeroID.disabled = false;
        estadoCivil.disabled = false
        anioIncorporacion.disabled = false;
        numDespacho.disabled = false;
        curso.disabled = true;
        departamento.disabled = false;
        seccion.disabled = true;
    } else if (opcion == 'personalServicio') {
        nombre.disabled = false;
        apellidos.disabled = false;
        numeroID.disabled = false;
        estadoCivil.disabled = false
        anioIncorporacion.disabled = false;
        numDespacho.disabled = false;
        curso.disabled = true;
        departamento.disabled = true;
        seccion.disabled = false;
    }
    return
}

// dependiendo el select, cuando cambia la opcion(change) llama a la funcion restricciones
document.getElementById('profesion').addEventListener('change', restricciones);

class Persona {
    nombre; apellidos; numeroID; estadoCivil
    constructor(nombre, apellidos, numeroID, estadoCivil) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.numeroID = numeroID;
        this.estadoCivil = estadoCivil;
    }

    cambiarEstado(nuevoEstado) {
        this.estadoCivil = nuevoEstado
    }
}

class Empleado extends Persona {
    anioIncorporacion; numDespacho
    constructor(persona, anioIncorporacion, numDespacho) {
        // atributos de clase padre (persona)
        super(persona.nombre, persona.apellidos, persona.numeroID, persona.estadoCivil)
        this.anioIncorporacion = anioIncorporacion;
        this.numDespacho = numDespacho;
    }

    reasignarDespacho(nuevoDespacho) {
        this.numDespacho = nuevoDespacho
    }
}

class Estudiante extends Persona {
    curso
    constructor(persona, curso) {
        // atributos clase padre (persona)
        super(persona.nombre, persona.apellidos, persona.numeroID, persona.estadoCivil)
        this.curso = curso;
    }

    cambiarCurso(nuevoCurso) {
        this.curso = nuevoCurso
    }
}

class Profesor extends Empleado {
    departamento
    constructor(empleado, departamento) {
        // atributos clase padre (empleado y persona)
        super(empleado.nombre, empleado.apellidos, empleado.numeroID, empleado.estadoCivil, empleado.anioIncorporacion, empleado.numDespacho)
        this.departamento = departamento;
    }

    cambiarDpto(nuevoDpto) {
        this.departamento = nuevoDpto
    }
}

class PersonalServicio extends Empleado {
    seccion
    constructor(empleado, seccion) {
        // atributos clase padre (empleado y persona)
        super(empleado.nombre, empleado.apellidos, empelado.numeroID, empleado.estadoCivil, empleado.anioIncorporacion, empleado.numDespacho)
        this.seccion = seccion;
    }

    cambiarSeccion(nuevaSeccion) {
        this.seccion = nuevaSeccion
    }
}

class CentroEducativo {
    constructor() {
        // arreglo vacio donde se van a guardar las altas
        this.personas = [];
    }

    darBaja(personas, numeroID) {
        // crea un nuevo array donde saca a la persona dependiendo su id
        // en el array personas, filtra por su id y si es diferente al id ingresado, las conserva
        const arrayActualizado = personas.filter(persona => persona.numeroID != numeroID);
        return arrayActualizado;
    }

    darAlta(nuevaPersona) {
        // pushea persona al arreglo
        this.personas.push(nuevaPersona);
    }

    imprimirDatos() {
        // itera sobre cada OBJETO del array personas y mediante la funcion flecha llama a imprimirdatos PARA CADA UNO DE ESOS OBJETOS
        this.personas.forEach(persona => {
            console.log("Nombre: ", persona.nombre);
            console.log("Apellidos: ", persona.apellidos);
            console.log("DNI: ", persona.numeroID);
            console.log("Estado civil: ", persona.estadoCivil);
            // cuando el valor sea true, lo muestra
            // en caso de que curso sea undefined (debido a las restricciones de tipo de persona) no devuelve un valor
            console.log("Curso: ", persona.curso || "N/A");
            console.log("Número de despacho: ", persona.numDespacho || "N/A");
            console.log("Año de incorporación: ", persona.anioIncorporacion);
            console.log("Departamento: ", persona.departamento);
            console.log("Sección: ", persona.seccion);
        });
    }
}

// crear una instancia para poder acceder a los métodos de la clase
const instanciaCentro = new CentroEducativo()

// recibe datos del form
function crearPersona(){
    // crea un objeto  con los datos de la persona
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const numeroID = document.getElementById("numeroID").value;
    const estadoCivil = document.getElementById("estadoCivil").value;
    const curso = document.getElementById("curso").value;
    const numDespacho = document.getElementById("numDespacho").value;
    const anioIncorporacion = document.getElementById("anioIncorporacion").value;
    const departamento = document.getElementById("departamento").value;
    const seccion = document.getElementById("seccion").value;

    return {
        nombre,
        apellidos,
        numeroID,
        estadoCivil,
        curso,
        numDespacho,
        anioIncorporacion,
        departamento,
        seccion
    };
}

// obtener boton
const boton = document.getElementById('boton')

// evento para que cuando se haga click en el boton, ejecute el método
boton.addEventListener('click', (event) => {
    /* preventDefault PARA QUE AL ENVIAR EL FORMULARIO, NO RECARGUE LA PAGINA
    esto es porque el boton de enviar es type="submit" lo que hace que al presionarlo, actualice la página */
    event.preventDefault();
    // crea un objeto donde nuevaPersona obtiene la funcion crearPersona, sus objetos y métodos dentro de él
    const nuevaPersona = crearPersona();
    /* se llama al metodo darAlta de la instancia (que accede a la clase), para pushear nuevaPersona (que ya obtiene los datos
    de la persona dependiendo su tipo y método para mostrar los datos) */
    instanciaCentro.darAlta(nuevaPersona);
    // imprime datos en consola
    instanciaCentro.imprimirDatos(nuevaPersona)
})

// obtiene boton para eliminar
const eliminar_btn = document.getElementById('eliminar_btn')

// evento para ejecutar metodo darBaja
eliminar_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const nuevoArray = darBaja(personas, numeroID);
    console.log(nuevoArray);
})

