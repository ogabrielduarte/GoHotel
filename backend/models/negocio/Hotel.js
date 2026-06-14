export class Hotel {
    #id;
    #cnpj;
    #fantasia;
    #localizacao;
    #descricao;
    #quartos;
    #imagem;

    constructor({
        id = null,
        cnpj,
        fantasia,
        localizacao,
        descricao,
        quartos,
        imagem
    }) {
        this.#id = id;

        this.setCnpj(cnpj);
        this.setFantasia(fantasia);
        this.setLocalizacao(localizacao);
        this.setDescricao(descricao);
        this.setQuartos(quartos);
        this.setImagem(imagem);
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

    // GET-SET CNPJ
    getCnpj() {
        return this.#cnpj;
    }

    setCnpj(cnpj) {
        if (!cnpj) {
            throw new Error('O campo CNPJ não pode estar vazio');
        }

        if (typeof cnpj !== 'string') {
            throw new Error('CNPJ inválido');
        }

        const cnpjLimpo = cnpj.replace(/\D/g, '');

        if (cnpjLimpo.length !== 14) {
            throw new Error('CNPJ inválido');
        }

        const regexCnpj = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
        const cnpjFormatado = cnpjLimpo.replace(regexCnpj, "$1.$2.$3/$4-$5");

        this.#cnpj = cnpjFormatado;
    }

    // GET-SET FANTASIA
    getFantasia() {
        return this.#fantasia;
    }

    setFantasia(fantasia) {
        if (!fantasia) {
            throw new Error('O campo nome fantasia não pode estar vazio');
        }

        if (typeof fantasia !== 'string') {
            throw new Error('Nome Fantasia inválido');
        }

        this.#fantasia = fantasia;
    }

    // GET-SET LOCALIZAÇÃO
    getLocalizacao() {
        return this.#localizacao;
    }

    setLocalizacao(localizacao) {
        if (!localizacao) {
            throw new Error('O campo localização não pode estar vazio');
        }

        if (typeof localizacao !== 'string') {
            throw new Error('Localização inválida');
        }

        this.#localizacao = localizacao;
    }

    // GET-SET DESCRIÇÃO
    getDescricao() {
        return this.#descricao;
    }

    setDescricao(descricao) {
        if (!descricao) {
            throw new Error('O campo descrição não pode estar vazio');
        }

        if (typeof descricao !== 'string') {
            throw new Error('Descrição inválida');
        }

        this.#descricao = descricao;
    }

    // GET-SET QUARTOS
    getQuartos() {
        return this.#quartos;
    }

    setQuartos(quartos) {
        if (!quartos) {
            throw new Error('O campo quartos não pode estar vazio');
        }

        if (typeof quartos !== 'number') {
            throw new Error('Número de quartos inválido');
        }

        this.#quartos = quartos;
    }

    // GET-SET IMAGEM
    getImagem() {
        return this.#imagem;
    }

    setImagem(imagem) {
        if (!imagem) {
            throw new Error('O campo imagem não pode estar vazio');
        }

        if (typeof imagem !== 'string') {
            throw new Error('Imagem inválida');
        }

        this.#imagem = imagem;
    }
}