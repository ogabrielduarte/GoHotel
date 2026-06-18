import bcrypt from 'bcrypt';

export class Usuario {
    #id;
    #nome;
    #genero;
    #email;
    #senha;
    #termos;
    #receberEmails

    constructor({ id = null, nome, genero, checagem, email, senha, termos, receberEmails }) {
        this.#id = id;
        this.setNome(nome);
        this.setGenero(genero);
        this.setEmail(email);
        this.setSenha(senha);
        this.setTermos(termos);
        this.setReceberEmails(receberEmails);

    }

    // GET-SET ID
    getId() {
        return this.#id;
    }

    static validarNome(nome) {
        if (!nome) throw new Error('O campo nome não pode estar vazio');
        if (typeof nome !== 'string') throw new Error('Nome inválido');

        if (nome.trim().split(/\s+/).length < 2) {
            throw new Error('Informe nome e sobrenome');
        }

        return nome.toUpperCase();
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

    static validarGenero(genero) {
        if (!genero) throw new Error('O campo gênero é obrigatório');
        if (typeof genero !== 'string') throw new Error('Gênero inválido');

        const generosValidos = ['masculino', 'feminino', 'nao-binario', 'nao-informar'];
        if (!generosValidos.includes(genero)) throw new Error('Gênero inválido');

        return genero;
    }

    setNome(nome) {
        this.#nome = Usuario.validarNome(nome);
    }

    // GET-SET GÊNERO
    getGenero() {
        return this.#genero;
    }

    setGenero(genero) {
        this.#genero = Usuario.validarGenero(genero);
    }

    // GET-SET E-MAIL
    getEmail() {
        return this.#email;
    }

     static validarEmail(email) {
        if (!email) throw new Error('O campo e-mail não pode estar vazio');
        if (typeof email !== 'string') throw new Error('Email inválido');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('O formato do e-mail não é válido');
        }

        return email;
    }

    setEmail(email) {
        this.#email = Usuario.validarEmail(email);
    }

    // GET-SET SENHA CRIPTOGRAFADA
    getSenha() {
        return this.#senha;
    }

    static validarSenha(senha) {
        if (!senha) throw new Error('O campo senha não pode estar vazio');
        if (typeof senha !== 'string') throw new Error('Senha inválida');
        if (senha.length < 8) throw new Error('Senha muito curta');

        return bcrypt.hashSync(senha, 10);
    }

    setSenha(senha) {
        this.#senha = Usuario.validarSenha(senha);
    }

    // GET-SET TERMOS
    getTermos() {
        return this.#termos;
    }

    setTermos(termos) {

        if (!termos) {
            throw new Error(
                'É obrigatório aceitar o compartilhamento de dados'
            );
        }

        this.#termos = 1;
    }

    // GET-SET RECEBER E-MAILS
    getReceberEmails() {
        return this.#receberEmails;
    }

    setReceberEmails(receberEmails) {

        if (!receberEmails) {
            receberEmails = 0
        } else {
            receberEmails = 1
        }

        this.#receberEmails = receberEmails;
    }
}
