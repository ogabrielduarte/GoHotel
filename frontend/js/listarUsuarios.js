async function listarUsuarios() {
    const resposta = await fetch('http://localhost:3000/usuarios');
    
    const usuarios = await resposta.json();
    
    const container = document.getElementById('container-usuarios');

    container.innerHTML = '';

    usuarios.forEach(usuario => {
        const card = document.createElement('div');
        
        card.classList.add('card');
        
        card.innerHTML = `
            <h3>${usuario.nome}</h3>
            <p>Email: ${usuario.email}</p>

            <button class="update-btn" data-id="${usuario.id}">Atualizar</button>
            <button class="delete-btn" data-id="${usuario.id}">Excluir</button>
        `;
        
        container.appendChild(card);
    });
}

listarUsuarios();

setInterval(listarUsuarios, 5000);