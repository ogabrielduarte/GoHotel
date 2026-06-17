/* const id = localStorage.getItem("id")

const token = localStorage.getItem("token");

async function listarUsuarios() {

    const resposta = await fetch(`http://localhost:3000/reservas/${id}/usuario`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await resposta.json();
    console.log(data)

    const container = document.getElementById('container-reservas');

    container.innerHTML = '';

    usuarios.forEach(usuario => {

        const card = document.createElement('div');

        card.classList.add('card-geral');

        card.innerHTML = `
            <h3>${usuario.nome}</h3>

            <p>Email: ${usuario.email}</p>

            <div class="buttons">
                <button class="btn-update" data-value="${usuario.id}">
                    Atualizar
                </button>

                <button class="btn-delete" data-value="${usuario.id}">
                    Deletar
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach(button => {

        button.addEventListener('click', async () => {

            if (confirm(`Deseja deletar o usuário?`)) {
                await fetch(`http://localhost:3000/usuarios/${button.dataset.value}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert('Usuário deletado');
            }

            listarUsuarios();
        });

    });

}

listarUsuarios(); */