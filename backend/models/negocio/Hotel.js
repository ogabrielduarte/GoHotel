export class Hotel {
    #id;
    #cnpj;
    #fantasia;
    #localizacao;
    #quartos; //número de quartos disponíveis no hotel

    constructor({ id = null, cnpj, fantasia, localizacao, quartos }) {
        this.#id = id;
        setCnpj(cnpj);
        setFantasia(fantasia);
        setLocalizacao(localizacao);
        setQuartos(quartos);
    }

    //GET-SET ID
    getId() {
        return this.#id;
    }

    setId(id) {
        if (id !== null && typeof id !== 'number') {
            throw new Error('ID inválido');
        }

        this.#id = id;
    }

    //GET-SET CNPJ
    getCnpj() {
        return this.#cnpj;
    }

    setCnpj(cnpj) {
        if (!cnpj) {
            throw new Error('O campo CNPJ não pode estar vazio');
        }

        if(typeof cnpj !== 'string') {
            throw new Error('CNPJ inválido');
        }

     if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj)) {
            throw new Error('CNPJ inválido');
        }

        this.#cnpj = cnpj
    }

    //GET-SET FANTASIA
    getFantasia() {
        return this.#cnpj;
    }

    setFantasia(fantasia) {
        if (!fantasia) {
            throw new Error('O campo nome fantasia não pode estar vazio');
        }

        if(typeof fantasia !== 'string') {
            throw new Error('Nome Fantasia inválido');
        }

        this.#fantasia = fantasia;
    }

    //GET-SET LOCALIZACAO
    getLocalizacao() {
        return this.#cnpj;
    }

    setLocalizacao(localizacao) {
        if (!localizacao) {
            throw new Error('O campo localização não pode estar vazio');
        }

        if(typeof localizacao !== 'string') {
            throw new Error('Localização inválida');
        }
        
        this.#localizacao = localizacao
    }

    //GET-SET QUARTOS
    getQuartos() {
        return this.#quartos;
    }

    setQuartos(quartos) {
        if (!quartos) {
            throw new Error('O campo quartos não pode estar vazio');
        }

        if(typeof quartos !== 'number') {
            throw new Error('Número de quartos inválido');
        }

        this.#quartos = quartos;
    }
}
