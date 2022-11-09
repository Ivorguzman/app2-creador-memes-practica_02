const w = window;
const d = document;
console.log("consola activa 2");
// obtener el ancho de la ventana
const ANCHO_DISPOSITIVO = w.innerWidth;// La propiedad de solo lectura innerWidth devuelve el ancho interior de la ventana en píxeles. Esto incluye el ancho de la barra de desplazamiento vertical, si está presente.

class CreadorMemes {
    constructor() {
        this.$$marcoCanvas = d.getElementById('$marcoCanvas');
        this.$btnCargarmagen = d.getElementById('imagen');
        this.$textoSuperior = d.getElementById('textoSuperior');
        this.$textoInferior = d.getElementById('textoInferior');
        this.$btnDescargarMeme = d.getElementById('descargarMeme');

        this.crearCanvas();
        this.agregarEventListeners();
        this.console();
    }
    console() {
        console.log("console.log()");
    }

    crearCanvas() { // define dimensiones de ls pantalla del dispositivo
        console.log(" crearCanvas");
        let alto = Math.min(480, ANCHO_DISPOSITIVO - 30);
        let ancho = Math.min(640, ANCHO_DISPOSITIVO - 30);
        console.log(this);
        this.$$marcoCanvas.height = alto;
        this.$$marcoCanvas.width = ancho;
    }


    agregarEventListeners() {
        console.log("agregareventListeners()");
        this.crearMeme = this.crearMeme.bind(this);
        this.descargarMeme = this.descargarMeme.bind(this);
        let entradas = [this.$textoSuperior, this.$textoInferior, this.$btnCargarmagen];

        entradas.forEach(e => e.addEventListener('keyup', this.crearMeme));

        entradas.forEach(e => e.addEventListener("change", this.crearMeme));

        //   this.btnDescargarMeme.addEventListener('click', this.descargarMeme);
        this.$btnDescargarMeme.addEventListener('click', this.descargarMeme);


    }

    crearMeme() {
        console.log("crearMemes() ");

    };

    redimensionarCanvas(alto, ancho) {

    }

    descargarMeme() {
        console.log("descargarMeme()");
    }
}

new CreadorMemes();
