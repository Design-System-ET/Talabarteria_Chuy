import Swal from "sweetalert2";

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
                <div class="col mb-4">
                    <div class="card" style="width: 18rem;">
                    <img src="${p.imagen}" class="card-img-top img-producto img_tienda" alt="${p.titulo}" data-img="${p.imagen}">
                    <div class="card-body">
                        <h5 class="card-title">${p.titulo}</h5>
                        <p class="card-text">${p.descripcion}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${p.item1}</li>
                        <li class="list-group-item">${p.item2}</li>
                        <li class="list-group-item">${p.item3}</li>
                    </ul>
                    <div class="card-body">
                        <a href="${cel}" target="_blank" class="btn btn-primary">Comprar</a>
                        <a href="${p.texto2}" class="card-link text-center">${p.texto2}</a>
                    </div>
                </div>
                </div>
            `;
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
            }
        });

    })
    .catch(err => console.error('Error cargando productos:', err));



