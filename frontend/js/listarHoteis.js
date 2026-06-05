async function listarHoteis() {
    const resposta = await fetch('http://localhost:3000/hoteis');
    
    const hoteis = await resposta.json();
    
    const container = document.getElementById('container-hoteis');

    container.innerHTML = '';

    hoteis.forEach(hotel => {
        const card = document.createElement('div');
        
        card.classList.add('card');
        
        card.innerHTML = `
            <h3>${hotel.nome}</h3>
            <p>Email: ${hotel.email}</p>

            <button class="update-btn" data-id="${hotel.id}">Atualizar</button>
            <button class="delete-btn" data-id="${hotel.id}">Excluir</button>
        `;
        
        container.appendChild(card);
    });
}

listarHoteis();

setInterval(listarHoteis, 5000);