export async function login(email, senha) {
    const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(data.erro);
    }

    localStorage.setItem("token", data.token);

    return data;
}