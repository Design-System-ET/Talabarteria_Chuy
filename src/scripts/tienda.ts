//efecto al cargar la tienda
import {gsap} from "gsap";
import { ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


import Swal from "sweetalert2";
import { Producto } from '../interfaces/Producto';

const cel = 'https://wa.link/c17sfd';

fetch('/Talabarteria_Chuy/productos.json')
    .then(async (response) => {
        if (!response.ok) {
            throw new Error('Error HTTP: ' + response.status);
        }
        return response.json();
    })
    .then((productos: Producto[]) => {
        const contenedor = document.getElementById('productos');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        productos.forEach((p) => {
            contenedor.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${p.imagen}" class="card-img-top img-producto img_tienda" alt="${p.titulo}" data-img="${p.imagen}">
                    <div class="card-body">
                        <h5 class="card-title" style="font-weight: 900;">${p.titulo}</h5>
                        <p class="card-text" style="text-align: justify; height: auto;">${p.descripcion}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        
                        <li class="list-group-item" style="font-weight: 900; color: green; text-align: right;">${p.item3}</li>
                    </ul>
                    <div class="card-body">
                        <a href="${cel}" target="_blank" class="btn btn-primary">Comprar</a>
                        <a href="javascript:void(0)" class="card-link text-center link-toggle-desc" data-texto2="${p.texto2}">Ver mas</a>
                    </div>
                </div>
            `;
        });

        // 👇 efecto al cargar la tienda
        const cards = contenedor.querySelectorAll('.card');
        gsap.utils.toArray('.card').forEach((card: any) => {
            gsap.from(card, {
                y: -100,
                opacity: 0,
                scale: 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 5,
                },
            });


    });

        // 👇 evento después de renderizar
        contenedor.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('img-producto')) {
                const img = target.getAttribute('data-img');

                Swal.fire({
                    imageUrl: img || '',
                    confirmButtonText: 'Cerrar'
                });
            } else if (target.classList.contains('link-toggle-desc')) {
                e.preventDefault();
                const card = target.closest('.card');
                const desc = card?.querySelector('.card-text');
                if (desc) {
                    desc.classList.toggle('expanded');
                    target.textContent = desc.classList.contains('expanded')
                        ? 'Ocultar'
                        : 'Ver mas';
                }
            }
        });

    })
    .catch(err => console.error('Error cargando productos:', err));
