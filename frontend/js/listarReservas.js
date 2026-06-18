const id = localStorage.getItem("id");
const token = localStorage.getItem("token");

export async function listarReservas(container) {

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const resposta = await fetch(`http://localhost:3000/usuarios/reservas/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const reservas = await resposta.json();
    console.log(reservas);

    container.innerHTML = '';

    const lista = document.createElement('div');
    lista.classList.add('lista-reservas');

    reservas.forEach(reserva => {
        const card = document.createElement('div');
        card.classList.add('card-reserva');

        card.innerHTML = `
            <h3>${reserva.nomeLocal ?? 'Reserva'}</h3>
            <p>Data: ${reserva.data}</p>
            <p>Horário: ${reserva.horario}</p>
            <div class="buttons">
                <button class="btn-delete" data-value="${reserva.id}">
                    Cancelar
                </button>
            </div>
        `;

        lista.appendChild(card);
    });

    container.appendChild(lista);

    lista.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', async () => {
            if (confirm('Deseja cancelar essa reserva?')) {
                await fetch(`http://localhost:3000/reservas/${button.dataset.value}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Reserva cancelada');
            }
            listarReservas(container); // recarrega
        });
    });
}