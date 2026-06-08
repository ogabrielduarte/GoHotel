export class Pagamento {

    #id;
    #valor;
    #status;
    #idUsuario;
    #idHotel;

    constructor({
        id = null,
        valor,
        status,
        idUsuario,
        idHotel
    }) {
        this.#id = id;
        this.setValor(valor);
        this.setStatus(status);
        this.setIdUsuario(idUsuario);
        this.setIdHotel(id_hotel);
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

    // GET-SET ID_USUARIO
    getIdUsuario() {
        return this.#idUsuario;
    }

    setIdUsuario(idUsuario) {

        idUsuario = Number(idUsuario);

        if (isNaN(idUsuario) || idUsuario <= 0) {
            throw new Error('ID do usuário inválido');
        }

        this.#idUsuario = idUsuario;
    }

    // GET-SET ID_HOTEL
    getIdHotel() {
        return this.#idHotel;
    }

    setIdHotel(idHotel) {

        idHotel = Number(idHotel);

        if (isNaN(idHotel) || idHotel <= 0) {
            throw new Error('ID do hotel inválido');
        }

        this.#idHotel = idHotel;
    }

}