import sqlite3 from 'sqlite3';

export class ReservaDAO {
    iniciar() {
        return new sqlite3.Database('./database/gohotel_db.db');
    }
}