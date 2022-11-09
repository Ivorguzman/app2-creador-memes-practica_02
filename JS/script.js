const w = window;
const d = document;
console.log("consola activa 1");
// obtener el ancho de la ventana
const ANCHO_DISPOSITIVO = w.innerWidth; // La propiedad de solo lectura innerWidth devuelve el ancho interior de la ventana en píxeles.de un dispositivo.  Esto incluye el ancho de la barra de desplazamiento vertical, si está presente.

class CreadorMemes {
    constructor() {// Inicializa componentes e invoca metodos
        console.log("constructor()");
        // Propiedades directas
        this.$marcoCanvas = d.getElementById('areaCanvas'); // Variable de instancia
        this.$btnCargarmagen = d.getElementById('btnCargarmagen');// Variable de instancia
        this.$textoSuperior = d.getElementById('textoSuperior');// Variable de instancia
        this.$textoInferior = d.getElementById('textoInferior');// Variable de instancia
        this.$btnDescargarMeme = d.getElementById('descargarMeme');// Variable de instancia
        //Metodos directos
        this.crearCanvas();
        this.agregarEventListeners();
    }



    crearCanvas() { // define dimensiones de ls pantalla del dispositivo
        console.log("crearCanvas()");
        let alto = Math.min(480, ANCHO_DISPOSITIVO - 30);
        let ancho = Math.min(640, ANCHO_DISPOSITIVO - 30);

        this.$marcoCanvas.height = alto;
        this.$marcoCanvas.width = ancho;
    };


    agregarEventListeners() {
        console.log("agregareventListeners()");
        // console.log(this);
        this.crearMeme = this.crearMeme.bind(this); // Propiedad que almacena un metodo enlazado .crearMeme.bind(this)
        this.descargarMeme = this.descargarMeme.bind(this); // Propiedad que almacena un metodo enlazado .crearMeme.bind(this)
        let entradas = [this.$textoSuperior, this.$textoInferior, this.$btnCargarmagen];

        entradas.forEach(e => e.addEventListener('keyup', this.crearMeme)); // añade evento addEventListener a cada elemnto del array

        entradas.forEach(e => e.addEventListener("change", this.crearMeme));

        this.$btnDescargarMeme.addEventListener('click', this.descargarMeme);// añade evento addEventListener al boton

    };
    crearMeme() {
        console.log("crearMeme() ");
        // console.log(this);
        // console.log(this.$marcoCanvas);
        let contenidoRenderCanvas = this.$marcoCanvas.getContext('2d');
        // console.log(contenidoRenderCanvas);
        if (this.$btnCargarmagen.files && this.$btnCargarmagen.files[0]) {
            console.log(this);
            // console.log(this.$btnCargarmagen.files);
            // console.log(this.$btnCargarmagen.files[0]);

            // API File (.files) añadida al DOM en HTML5, ahora hace posible que la página web solicite al usuario que seleccione archivos locales y, a continuación, lea el contenido de esos archivos. Esta selección se puede hacer, ya sea usando un elemento <input>de HTML o arrastrando y soltando.
            let lector = new FileReader();
            //El objeto FileReader() permite que las aplicaciones web lean ficheros (o información en búfer) almacenados en el cliente de forma asíncrona, usando los objetos File o Blob dependiendo de los datos que se pretendan leer.
            // console.log(lector);
            lector.onload = () => {
                let imagenCargada = new Image();
                console.log(this.$marcoCanvas.height);
                console.log(imagenCargada.height);

                imagenCargada.onload = () => {
                    console.log(this.$marcoCanvas.height);
                    this.$marcoCanvas.height = imagenCargada.height;
                    console.log(imagenCargada.height);
                    console.log(this.$marcoCanvas.height);
                    this.$marcoCanvas.width = imagenCargada.width;
                    console.log(imagenCargada.width);
                    console.log(this.$marcoCanvas.width);

                    contenidoRenderCanvas.clearRect(0, 0, this.$marcoCanvas.height, this.$marcoCanvas.width);
                    // El método .clearRect() , borrando cualquier contenido dibujado anteriormente.
                    console.log(contenidoRenderCanvas);

                    contenidoRenderCanvas.drawImage(imagenCargada, 0, 0);
                    //drawImage(image, dx, dy,...); proporciona diferentes formas para dibujar una imagen dentro de canvas.
                    let puntoFuente = ((this.$marcoCanvas.width + this.$marcoCanvas.height) / 2) * 5 / 100;
                    contenidoRenderCanvas.font = `${puntoFuente}pt sans-serif`;
                    contenidoRenderCanvas.textAlign = 'center';
                    contenidoRenderCanvas.textBaseline = 'top';

                    contenidoRenderCanvas.lineJoin = 'round';
                    contenidoRenderCanvas.lineWidth = puntoFuente / 5; //Genera el grueso dl borde de la letra
                    contenidoRenderCanvas.strokeStyle = '#000000';
                    contenidoRenderCanvas.fillStyle = 'yellow'; // color de la letra

                    let textoArriba = this.$textoSuperior.value.toUpperCase();
                    let textoAbajo = this.$textoInferior.value.toUpperCase();

                    contenidoRenderCanvas.strokeText(textoArriba, this.$marcoCanvas.width / 2, this.$marcoCanvas.height * (5 / 100), this.$marcoCanvas.width - 90);
                    //strokeText(text, x, y, maxWidth)  dibuja los contornos de los caracteres de una cadena de texto en las coordenadas especificadas y maximo ancho de la linea
                    contenidoRenderCanvas.fillText(textoArriba, this.$marcoCanvas.width / 2, this.$marcoCanvas.height * (5 / 100), this.$marcoCanvas.width - 90);

                    contenidoRenderCanvas.strokeText(textoAbajo, this.$marcoCanvas.width / 2, this.$marcoCanvas.height * (90 / 100), this.$marcoCanvas.width - 90);
                    contenidoRenderCanvas.fillText(textoAbajo, this.$marcoCanvas.width / 2, this.$marcoCanvas.height * (90 / 100), this.$marcoCanvas.width - 90);

                    this.redimensionarCanvas(this.$marcoCanvas.height, this.$marcoCanvas.width);
                    console.log(this.$marcoCanvas.height);
                };
                imagenCargada.src = lector.result;

                //La propiedad .result  devuelve el contenido del  archivo FileReader,  únicamente después de que la operación de lectura  válida del archivo (esté completada.)
            };

            lector.readAsDataURL(this.$btnCargarmagen.files[0]);
            // El método readAsDataURLes() usado para leer el contenido del especificado Blobo File. Cuando la operación de lectura es terminada, el readyState (en-US) se convierte en DONE, y el loadendes lanzado. En ese momento, el atributo resultcontiene la información como un dato: URL que representa la información del archivo como una cadena de caracteres codificados en



        }

    };
    redimensionarCanvas(alto, ancho) {
        console.log("redimensionarCanvas()");

        this.$marcoCanvas.style.height = `${alto}px`;
        this.$marcoCanvas.style.width = `${ancho}px`;

        while (alto > Math.min(900, ANCHO_DISPOSITIVO - 30) && ancho > Math.min(900, ANCHO_DISPOSITIVO - 30)) {
            alto = alto / 2; // Reduccion por bicpcion
            ancho /= 2;
            this.$marcoCanvas.style.height = `${alto}px`;
            this.$marcoCanvas.style.width = `${ancho}px`;
        }
    }

    descargarMeme() {
        console.log("descargarMeme()");
        if (!this.$btnCargarmagen.files[0]) {
            this.$btnCargarmagen.parentElement.classList.add('has-error');
            console.log(this.$btnCargarmagen);
            console.log(this.$btnCargarmagen.parentElement.classList);
            return;
        }

      

        if (this.$textoInferior.value === '') {
            this.$btnCargarmagen.parentElement.classList.remove('has-error');
            this.$textoInferior.parentElement.classList.add('has-error');
            return;
        }

        this.$btnCargarmagen.parentElement.classList.remove('has-error');
        this.$textoInferior.parentElement.classList.remove('has-error');

        let imagenCargadaMarco = this.$marcoCanvas.toDataURL('image/png');
        let atributoHref = document.createAttribute('href');
        atributoHref.value = imagenCargadaMarco.replace(/^data:imagenCargaBBda\/[^;]/, 'data:application/octet-stream');
        this.$btnDescargarMeme.setAttributeNode(atributoHref);
    }
};




new CreadorMemes();  // instancia de objeto tipo credor crearMemes() .Invocacion implicita  de la clase del CreadorMemes() e ejecucion de su  constructor() 

