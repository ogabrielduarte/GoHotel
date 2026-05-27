export class Reserva {
    #id;
    #dataEntrada;
    #dataSaida;
    #idUsuario;
    #idHotel;

    constructor({ id = null, dataEntrada, dataSaida, idUsuario, idHotel }) {
        this.#id = id;
        setDataEntrada(dataEntrada);
        setDataSaida(dataSaida);
        setIdUsuario(idUsuario);
        setIdHotel(idHotel);
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

    // GET-SET DATA_ENTRADA
    getDataEntrada() {
        return this.#dataEntrada;
    }

    setDataEntrada(data) {
        if (!data) {
            throw new Error('O campo data de entrada não pode estar vazio');
        }

        if (typeof data !== 'string') {
            throw new Error('Data inválida')
        }

        let regexData = /^\d{2}\/\d{2}\/\d{4}$/;

        if (!regexData.test(data)) {
            throw new Error('Formato de data inválido')
        }
    }

    // GET-SET DATA_SAIDA
    getDataSaida() {
        return this.#dataSaida;
    }

    setDataSaida(data) {
        if (!data) {
            throw new Error('O campo data de saída não pode estar vazio');
        }

        if (typeof data !== 'string') {
            throw new Error('Data inválida')
        }

        let regexData = /^\d{2}\/\d{2}\/\d{4}$/;

        if (!regexData.test(data)) {
            throw new Error('Formato de data inválido')
        }
    }

    // GET-SET ID_USUARIO
    getIdUsuario() {
        return this.#idUsuario;
    }

    setIdUsuario(idUsuario) {
        if (idUsuario !== null && typeof idUsuario !== 'number') {
            throw new Error('ID_USUARIO inválido');
        }

        this.#idUsuario = idUsuario;
    }

    // GET-SET ID_HOTEL
    getIdHotel() {
        return this.#idHotel;
    }

    setIdHotel(idHotel) {
        if (idHotel !== null && typeof idHotel !== 'number') {
            throw new Error('ID_HOTEL inválido');
        }

        this.#idHotel = idHotel;
    }
}
