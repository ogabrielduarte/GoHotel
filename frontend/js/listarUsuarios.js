const token = localStorage.getItem("token");

async function listarUsuarios() {

    const resposta = await fetch('http://localhost:3000/usuarios', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await resposta.json();

    const usuarios = data.usuarios;

    const container = document.getElementById('container-geral');

    container.innerHTML = '';

    usuarios.forEach(usuario => {

        const card = document.createElement('div');

        card.classList.add('card-geral');

        card.innerHTML = `
            <h3>${usuario.nome}</h3>

            <p>Email: ${usuario.email}</p>

            <div class="buttons">
                <button class="btn-update">Atualizar</button>
                <button class="btn-delete">Deletar</button>
            </div>
        `;

        container.appendChild(card);
    });
}

listarUsuarios();

if (!token) {
    document.getElementById('logout').style.display = 'none';
}

const perfilPage = document.getElementById("perfil");
const redirectReserva = document.getElementById("reserva");
const logoutButton = document.getElementById("logout");

perfilPage.addEventListener("click", () => {

    if (token) {
        location.href = '../pages/user.html';
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

    localStorage.removeItem('token');

    alert('Deslogado com sucesso!');

    location.href = '../index.html';

});

setInterval(listarUsuarios, 30000);
