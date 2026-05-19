export class Usuario {
    #id;
    #nome;
    #email;
    #senha;
    #telefone;

    constructor({ id = null, nome, email, senha, telefone }) {
        this.setId(id);
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setTelefone(telefone);
    }

    // GET-SET ID
    getId() {
        return this.#id;
    }

    setId(id) {
        if (id !== null && typeof id !== 'number') {
            throw new Error('ID inválido');
        }

        this.#id = id;
    }

    // GET-SET NOME
    getNome() {
        return this.#nome;
    }

    setNome(nome) {
        if (typeof nome !== 'string') {
            throw new Error('Nome inválido');
        }

        if (nome.trim().split(' ').length < 2) {
            throw new Error('Informe nome e sobrenome');
        }

        this.#nome = nome;
    }

    // GET-SET E-MAIL
    getEmail() {
        return this.#email;
    }

    setEmail(email) {
        if (typeof email !== 'string') {
            throw new Error('Email inválido');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('E-mail inválido');
        }

        this.#email = email;
    }

    // SET SENHA (sem getter, somos todos bem inteligentes)
    setSenha(senha) {
        if (typeof senha !== 'string') {
            throw new Error('Senha inválida');
        }

        if (senha.length < 8) {
            throw new Error('Senha muito curta');
        }

        this.#senha = senha;
    }

    // GET-SET TELEFONE
    getTelefone() {
        return this.#telefone;
    }

    setTelefone(telefone) {
        if (!telefone) {

        }
        if (typeof telefone !== 'string') {
            throw new Error('Telefone inválido');
        }

        if (!/^55\d{11}$/.test(telefone)) {
            throw new Error('Telefone brasileiro inválido');
        }

        this.#telefone = telefone;
    }
}
