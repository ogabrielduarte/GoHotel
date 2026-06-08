const token = localStorage.getItem("token")

async function listarHoteis() {
    const resposta = await fetch('http://localhost:3000/hoteis');
    
    const data = await resposta.json();
    
    const hoteis = data.hoteis;

    const container = document.getElementById('container-hoteis');

    container.innerHTML = '';

    hoteis.forEach(hotel => {
        const card = document.createElement('div');
        
        card.classList.add('card');
        
        card.innerHTML = `
            <h3>${hotel.fantasia}</h3>
            <p>Localização: ${hotel.localizacao}</p>

            <button class="btn-reserva" data-id="${hotel.id}">Fazer Reserva</button>
        `;
        
        container.appendChild(card);
    });

    container.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-reserva')) {
            window.location.href = '../pages/reserva.html';
        }
    });
}

    

listarHoteis();

if(!token) {
        document.getElementById('logout').style.display = 'none';
    }

    const perfilPage = document.getElementById("perfil");
    const redirectReserva = document.getElementById("reserva");
    const logoutButton = document.getElementById("logout");

    perfilPage.addEventListener("click", () => {
        if (token) {
            location.href = './pages/user.html'
        } else {
            alert('Faça o log-in para acessar o perfil');
            window.location.href = '../pages/login.html';
        }
    });

    redirectReserva.addEventListener("click", () => {
        if (token) {
            location.href = '../pages/hoteis.html'
        } else {
            alert('Faça o log-in para fazer reservas');
            window.location.href = '../pages/login.html';
        }
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem('token');
        alert('Deslogado com sucesso!');
        location.href = './index.html';
    });

setInterval(listarHoteis, 5000);