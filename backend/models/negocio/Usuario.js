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
        if (!nome) {
            throw new Error('O campo nome não pode estar vazio');
        }

        if (typeof nome !== 'string') {
            throw new Error('Nome inválido');
        }

        const regexEspaco = /\s+/;

        if (nome.trim().split(regexEspaco).length < 2) {
            throw new Error('Informe nome e sobrenome');
        }

        this.#nome = nome;
    }

    // GET-SET GÊNERO
    getGenero() {
        return this.#genero;
    }

    setGenero(genero) {

        if (!genero) {
            throw new Error('O campo gênero é obrigatório');
        }

        if (typeof genero !== 'string') {
            throw new Error('Gênero inválido');
        }

        const generosValidos = [
            'masculino',
            'feminino',
            'não-binário',
            'Prefiro não Informar'
        ];

        if (!generosValidos.includes(genero)) {
            throw new Error('Gênero inválido');
        }

        this.#genero = genero;
    }

    // GET-SET E-MAIL
    getEmail() {
        return this.#email;
    }

    setEmail(email) {
        if (!email) {
            throw new Error('O campo e-mail não pode estar vazio');
        }

        if (typeof email !== 'string') {
            throw new Error('Email inválido');
        }

        let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            throw new Error('O formato do e-mail não é válido');
        }

        this.#email = email;
    }

    // GET-SET SENHA CRIPTOGRAFADA
    getSenha() {
        return this.#senha;
    }

    setSenha(senha) {
        if (!senha) {
            throw new Error('O campo senha não pode estar vazio');
        }

        if (typeof senha !== 'string') {
            throw new Error('Senha inválida');
        }

        if (senha.length < 8) {
            throw new Error('Senha muito curta');
        }

        let senhaHash = bcrypt.hashSync(senha, 10)

        this.#senha = senhaHash;
    }

    // GET-SET TERMOS
    getTermos() {
        return this.#termos;
    }

    setTermos(termos) {

        if (termos !== 'on') {
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

        if (receberEmails === 'on') {
            receberEmails = 1;
        } else {
            receberEmails = 0;
        }

        this.#receberEmails = receberEmails;
    }
}
