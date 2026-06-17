import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./gohotel_db.db');

const hoteis = [
    {
        cnpj: '12.345.678/9012-34',
        fantasia: 'Pousada Pratagy',
        localizacao: 'Maceió, Brasil',
        descricao: 'A melhor casa de praia do Caribe Nordestino',
        qtd_quartos: 20,
        imagem: 'https://go-hotel.vercel.app/assets/images/hoteis-padrao/pratagy.jpg'
    },

    {
        cnpj: '13.579.135/7913-57',
        fantasia: 'O Pônei Saltitante',
        localizacao: 'Bree, Middle-earth',
        descricao: 'Uma casa agradável a olhos familiares',
        qtd_quartos: 20,
        imagem: 'https://go-hotel.vercel.app/assets/images/hoteis-padrao/ponei.jpg'
    },

    {
        cnpj: '02.468.024/6802-46',
        fantasia: 'The Great Hotel',
        localizacao: 'Budapest, Hungria',
        descricao: 'Ainda resta uma centelha fraca de civilização neste matadouro selvagem que já foi conhecido como humanidade.',
        qtd_quartos: 100,
        imagem: 'https://go-hotel.vercel.app/assets/images/hoteis-padrao/thegreat.jpg'
    },

    {
        cnpj: '42.424.242/4242-42',
        fantasia: 'Hotel Prefect',
        localizacao: 'England, United Kingdom',
        descricao: `DON'T PANIC`,
        qtd_quartos: 42,
        imagem: 'https://go-hotel.vercel.app/assets/images/hoteis-padrao/prefect.jpg'
    },

    {
        cnpj: '19.451.945./1945-19',
        fantasia: 'Kremlin',
        localizacao: 'Moskva - Rodina-mat',
        descricao: 'A liberdade na sociedade capitalista permanece praticamente a mesma que era nas antigas repúblicas gregas: liberdade para os donos de escravos.',
        qtd_quartos: 389,
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5rLZQxMuZXMv5x4D7PinGYWqtyeQHl1_o1Q&s'
    }
];

function hoteisPadrao() {

    const sql = `
        INSERT INTO hoteis (
            cnpj,
            fantasia,
            localizacao,
            descricao,
            qtd_quartos,
            imagem
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.serialize(() => {

        hoteis.forEach(hotel => {

            db.run(sql, [
                hotel.cnpj,
                hotel.fantasia,
                hotel.localizacao,
                hotel.descricao,
                hotel.qtd_quartos,
                hotel.imagem
            ]);

        });

    });

}

hoteisPadrao();