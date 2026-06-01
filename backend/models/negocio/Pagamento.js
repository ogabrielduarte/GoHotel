export class Pagamento {

    #id;
    #valor;
    #status;

    constructor({ id = null, valor, status }) {
        this.#id = id;
        this.setValor(valor);
        this.setStatus(status);
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

    // GET-SET VALOR
    getValor() {
        return this.#valor;
    }

    setValor(valor) {

        valor = Number(valor);

        if (isNaN(valor) || valor <= 0) {
            throw new Error('Valor inválido');
        }

        this.#valor = valor;
    }

    // GET-SET STATUS
    getStatus() {
        return this.#status;
    }

    setStatus(status) {

        if (!status) {
            throw new Error('Status obrigatório');
        }

        const statusValidos = [
            'pendente',
            'aprovado',
            'cancelado'
        ];

        if (!statusValidos.includes(status)) {
            throw new Error('Status inválido');
        }

        this.#status = status;
    }

}