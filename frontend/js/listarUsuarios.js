const token = localStorage.getItem("token");

let usuariosAtuais = [];

async function listarUsuarios() {

    const resposta = await fetch('http://localhost:3000/usuarios', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await resposta.json();

    usuariosAtuais = data.usuarios;

    const container = document.getElementById('container-geral');

    container.innerHTML = '';

    usuariosAtuais.forEach(usuario => {

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
                listarUsuarios();
            }

        });

    });

    const updateButtons = document.querySelectorAll('.btn-update');

    updateButtons.forEach(button => {

        button.addEventListener('click', () => {

            const usuario = usuariosAtuais.find(
                u => String(u.id) === String(button.dataset.value)
            );

            if (usuario) {
                abrirModalAtualizar(usuario);
            }

        });

    });

}

function abrirModalAtualizar(usuario) {

    const modalExistente = document.getElementById('modal-atualizar');

    if (modalExistente) {
        modalExistente.remove();
    }

    const overlay = document.createElement('div');

    overlay.classList.add('modal-overlay');
    overlay.id = 'modal-atualizar';

    overlay.innerHTML = `
        <div class="modal-content">
            <h2>Atualizar usuário</h2>

            <form id="form-atualizar-usuario">

                <label for="input-nome">Nome</label>
                <input
                    type="text"
                    id="input-nome"
                    name="nome"
                    value="${usuario.nome ?? ''}"
                    required
                >

                <label for="input-genero">Gênero</label>

                <select id="input-genero" name="genero">
                    <option value="masculino" ${usuario.genero === 'masculino' ? 'selected' : ''}>
                        Masculino
                    </option>

                    <option value="feminino" ${usuario.genero === 'feminino' ? 'selected' : ''}>
                        Feminino
                    </option>

                    <option value="nao-binario" ${usuario.genero === 'não-binário' ? 'selected' : ''}>
                        Não-Binário
                    </option>

                    <option value="nao-informar" ${usuario.genero === 'prefiro não informar' ? 'selected' : ''}>
                        Prefiro Não Informar
                    </option>
                </select>

                <label for="input-email">Email</label>

                <input
                    type="email"
                    id="input-email"
                    name="email"
                    value="${usuario.email ?? ''}"
                    required
                >

                <label for="input-senha">Nova senha</label>

                <input
                    type="password"
                    id="input-senha"
                    name="senha"
                    placeholder="Deixe em branco para não alterar"
                >

                <div class="modal-buttons">
                    <button type="submit" class="btn-salvar">
                        Salvar
                    </button>

                    <button type="button" class="btn-cancelar">
                        Cancelar
                    </button>
                </div>

            </form>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', event => {

        if (event.target === overlay) {
            overlay.remove();
        }

    });

    overlay.querySelector('.btn-cancelar')
        .addEventListener('click', () => {
            overlay.remove();
        });

    const fecharComEsc = event => {

        if (event.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', fecharComEsc);
        }

    };

    document.addEventListener('keydown', fecharComEsc);

    const form = overlay.querySelector('#form-atualizar-usuario');

    form.addEventListener('submit', async event => {

        event.preventDefault();

        const corpo = {
            nome: form.nome.value,
            genero: form.genero.value,
            email: form.email.value
        };

        if (form.senha.value.trim()) {
            corpo.senha = form.senha.value;
        }

        try {

            const resposta = await fetch(
                `http://localhost:3000/usuarios/${usuario.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(corpo)
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            alert('Usuário atualizado com sucesso!');

            overlay.remove();

            listarUsuarios();

        } catch (erro) {

            console.error(erro);

            alert('Erro ao atualizar usuário');

        }

    });

}

listarUsuarios();

if (!token) {
    document.getElementById('logout').style.display = 'none';
}

const nameElement = document.getElementById('name');

if (token && nameElement) {
    nameElement.innerHTML = localStorage.getItem('nome');
}

const perfilPage = document.getElementById("perfil");
const redirectReserva = document.getElementById("reserva");
const logoutButton = document.getElementById("logout");

perfilPage.addEventListener("click", () => {

    if (token) {

        const idUser = localStorage.getItem("id");

        location.href = `./user.html?id=${idUser}`;

    } else {

        alert('Faça o log-in para acessar o perfil');

        window.location.href = '../pages/login.html';

    }

});

redirectReserva.addEventListener("click", () => {

    if (token) {

        window.location.href = '../pages/hoteis.html';

    } else {

        alert('Faça o log-in para fazer reservas');

        window.location.href = '../pages/login.html';

    }

});

logoutButton.addEventListener("click", () => {

    if (confirm('Você quer encerrar a sessão?')) {

        localStorage.removeItem('token');
        localStorage.removeItem('nome');

        alert('Deslogado com sucesso!');

        location.href = '../index.html';

    }

});

setInterval(listarUsuarios, 30000);