export class Telefone {
    #id;
    #idUsuario;
    #telefone;

    constructor({ id = null, idUsuario, telefone }) {
        this.#id = id;
        this.setIdUsuario(idUsuario);
        this.setTelefone(telefone);
    }

    // GET-SET ID
    getId() {
        return this.#id;
    }

    setId(id) {

        if (!id && id !== null) {
            throw new Error('O campo id não pode estar vazio');
        }

        if (id !== null && typeof id !== 'number') {
            throw new Error('ID inválido');
        }

        this.#id = id;
    }

    // GET-SET ID_USUARIO
    getIdUsuario() {
        return this.#idUsuario;
    }

    setIdUsuario(idUsuario) {

        if (!idUsuario) {
            throw new Error('O campo idUsuario não pode estar vazio');
        }

        if (typeof idUsuario !== 'number') {
            throw new Error('ID_USUARIO inválido');
        }

        this.#idUsuario = idUsuario;
    }

    // GET-SET TELEFONE
    getTelefone() {
        return this.#telefone;
    }

    setTelefone(telefone) {

        if (!telefone) {
            throw new Error('O campo telefone não pode estar vazio');
        }

        if (typeof telefone !== 'string') {
            throw new Error('Telefone inválido');
        }

        let regexTelefone = /^55\d{11}$/;

        if (!regexTelefone.test(telefone)) {
            throw new Error('Telefone brasileiro inválido');
        }

        this.#telefone = telefone;
    }
}
