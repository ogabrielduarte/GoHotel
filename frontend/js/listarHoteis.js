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

            <button class="update-btn" data-id="${hotel.id}">Fazer Reserva</button>
        `;
        
        container.appendChild(card);
    });
}

listarHoteis();

setInterval(listarHoteis, 5000);