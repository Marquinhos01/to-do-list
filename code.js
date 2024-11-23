const formulario = document.getElementById('form');
const datos = {};
const datosContainer = document.getElementById('form-content');

formulario.addEventListener('submit', (event) =>{
    event.preventDefault();

    const formData = new FormData(formulario);
    console.log(formData);

    formData.forEach((value, key) =>{
        datos[key] = value;
    });
    
    console.log(datos);

    for (let key in datos){
        datosContainer.innerText += `${key}: ${datos[key]} \n`;
    };
});
