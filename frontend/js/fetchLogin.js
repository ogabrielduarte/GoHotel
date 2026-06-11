export async function login(email, senha) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.erro);
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.usuario.id);
    localStorage.setItem("nome", data.usuario.nome);

    return data;
}