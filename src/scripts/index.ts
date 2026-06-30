import Swal from "sweetalert2";

import fabricacionImg from '/public/Iconos/fabricacion.png';
import reparacionesImg from '/public/Iconos/reparaciones.png';
import marroquineriaImg from '/public/Iconos/marroquinerias.png';
import personalizacionImg from '/public/Iconos/personalizaciones.png';

document.addEventListener('DOMContentLoaded', function () {
    const fabricacion = document.getElementById('fabricacion') as HTMLButtonElement;

    fabricacion.onclick = function () {

        Swal.fire({
            imageUrl: fabricacionImg,
            imageWidth: 200,
            title: 'Fabricación a medida',
            html: `
                <div style="text-align: justify;">
                    Cada pieza se fabrica de forma totalmente artesanal y a medida, adaptándose a las necesidades, gustos y preferencias de cada cliente. Trabajamos con cueros seleccionados y técnicas tradicionales para crear artículos únicos, resistentes y funcionales, cuidando cada detalle desde el diseño hasta la terminación final. Ya sea para trabajo, campo o uso personal, cada producto se confecciona con dedicación, garantizando calidad, comodidad y una identidad propia en cada creación.
                </div>
            `,
            confirmButtonText: 'Cerrar'
        });
    }

    const reparaciones = document.getElementById('reparaciones') as HTMLButtonElement;

    reparaciones.onclick = function () {

        Swal.fire({
            imageUrl: reparacionesImg,
            imageWidth: 200,
            title: 'Reparacion y Restauracion',
            html: `
                <div style="text-align: justify;">
                    Devolvemos la vida a piezas de cuero que forman parte de la historia y el trabajo de nuestros clientes. Realizamos reparaciones y restauraciones artesanales de monturas, aperos, cinturones, bolsos y artículos de talabartería, respetando siempre su diseño y esencia original. Mediante técnicas tradicionales y materiales de calidad, recuperamos la funcionalidad, resistencia y belleza de cada pieza, prolongando su vida útil y conservando su valor afectivo y patrimonial.
                </div>
            `,
            confirmButtonText: 'Cerrar'
        });
    }

    const marroquineria = document.getElementById('marroquineria') as HTMLButtonElement;

    marroquineria.onclick = function () {

        Swal.fire({
            imageUrl: marroquineriaImg,
            imageWidth: 200,
            title: 'Marroquineria',
            html: `
                <div style="text-align: justify;">
                    Nuestra línea de marroquinería combina tradición, calidad y diseño en piezas elaboradas artesanalmente. Confeccionamos billeteras, cinturones, carteras, bolsos, portadocumentos y otros artículos de cuero utilizando materiales seleccionados y terminaciones cuidadas. Cada producto está pensado para ofrecer durabilidad, funcionalidad y elegancia, reflejando el carácter único del trabajo artesanal y la nobleza del cuero.
                </div>
            `,
            confirmButtonText: 'Cerrar'
        });
    }

    const person= document.getElementById('person') as HTMLButtonElement;

    person.onclick = function () {

        Swal.fire({
            imageUrl: personalizacionImg ,
            imageWidth: 200,
            title: 'Personalizaciones',
            html: `
                <div style="text-align: justify;">
                    Convertimos cada pieza en algo verdaderamente único mediante trabajos de personalización realizados de forma artesanal. Incorporamos nombres, iniciales, logotipos, grabados y detalles exclusivos que reflejan la identidad y el estilo de cada cliente. Ya sea para un regalo, un recuerdo especial o un artículo de uso personal, cada personalización se realiza con precisión y dedicación, aportando un valor distintivo a cada creación en cuero.
                </div>
            `,
            confirmButtonText: 'Cerrar'
        });
    }

});