async function LoadIMG()
{
    const fileInput = document.getElementById('fileInput');
    const inputImage = document.getElementById('inputImage');
    // Lectura de la imagen seleccionada por el usuario
    const file = fileInput.files[0];
    // Mostrar la imagen
    const ImageURL = URL.createObjectURL(file);
    inputImage.src = ImageURL;

}



async function loadModelAndPredict() {
    const fileInput = document.getElementById('fileInput');
    const inputImage = document.getElementById('inputImage');
    const predictionResult = document.getElementById('predictionResult');

    // Carga del modelo
    const model = await tf.loadLayersModel('Models/model.json');
    

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = async function() {
            // Escalamiento de la imagen a 150x150
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 150, 150);
            const imageData = ctx.getImageData(0, 0, 150, 150);

            // Conversión de la imagen a un tensor
            const tensor = tf.browser.fromPixels(imageData).expandDims();

            // Realización de la predicción
            const prediction = model.predict(tensor);

            // procesamiento de los datos
            var values = await prediction.data();

            
            var perro = values[0]
            var gato = values[1]
            if(perro > gato)
            {
                predictionResult.textContent = "Es un perro, pocentaje: "+perro.toFixed(2)+"%";
            }
            else
            {
                predictionResult.textContent = "Es un Gato, pocentaje: "+gato.toFixed(2)+"%";
            }
            // Cambiar las seciones
            var sections =document.querySelectorAll('section');
            sections[0].setAttribute('hidden','')
            sections[1].removeAttribute('hidden');
            // Cerrar el modal
            document.getElementById("Close").click()
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

function Reload()
{
    window.location.reload();

}
