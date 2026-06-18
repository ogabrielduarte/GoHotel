const token = localStorage.getItem("token")

async function listarHoteis() {
    const resposta = await fetch('http://localhost:3000/hoteis', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await resposta.json();

    const hoteis = data.hoteis;

    const container = document.getElementById('container-geral');

    container.innerHTML = '';

    hoteis.forEach(hotel => {

        const card = document.createElement('div');

        card.classList.add('card-geral');

        card.innerHTML = `
            <h3>${hotel.fantasia}</h3>

            <p>Localização: ${hotel.localizacao}</p>

            <div class="buttons">
                <button class="btn-reserva" id="reserva" data-id="${hotel.id}">Fazer Reserva</button>
            </div>
        `;

        container.appendChild(card);
    });

    container.addEventListener('click', (event) => {

        if (event.target.classList.contains('btn-reserva')) {

            const id = event.target.dataset.id;

            window.location.href = `reserva.html?id=${id}`;
        }
    });
}

listarHoteis();

if (!token) {
    document.getElementById('logout').style.display = 'none';
}

const nameElement = document.getElementById('name');

if (token && nameElement) {
    nameElement.innerHTML = `${localStorage.getItem('nome')}`;
}


const perfilPage = document.getElementById("perfil");
const redirectReserva = document.getElementById("reserva");
const logoutButton = document.getElementById("logout");

perfilPage.addEventListener("click", () => {
    if (token) {
        const idUser = localStorage.getItem("id")
        location.href = `\./user.html?id=${idUser}`
    } else {
        alert('Faça o log-in para acessar o perfil');
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

setInterval(listarHoteis, 30000);
