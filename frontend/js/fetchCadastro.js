export async function cadastrar(nome, genero, email, senha, termos, receberEmails) {
    const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, genero, email, senha, termos, receberEmails })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.erro);
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.id);
    localStorage.setItem("nome", data.data.nome);

    return data;
}