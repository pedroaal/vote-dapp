### Instalar dependencias

Dependencias globales: suit de truffle y compilador de solidity
```bash
$ npm i -g truffle ganache-cli solc
```
para asegurarse de que la instalacion es correcta
```bash
$ truffle version
```

### Blockchain

Antes de comenzar, se debe tener instalada la extension metamask

se inicia una blockchain local, si se desea se puede usar ganache desktop
```bash
$ ganache-cli
```

se compila y ejecuta el contrato en la blockchain de prueba
```bash
$ truffle compile
$ truffle migrate
```

una ves compilado y migrado se ejecuta
```bash
$ npm run dev
```
para iniciar el servidor de next, al abrir pedira la conneccion con metamask

### DB

Para la base de datos se usa sqlite, crea un archivo db.sqlite3.
Si se desea cambiar el nombre, se crea el archivo db_name.sqlite_ext, y se actualiza en util>db.
Al iniciar el servidor de next, se creara tablas y datos automaticos.

Se escoje sqlite para oviar el proceso de creado de base de datos en linea o local.
Se puede migrar a otros motores cambiando la configuracion en util>db, en la linea 2
```
const sequelize = new Sequelize('aes_db', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './db.sqlite3'
});
```
Revisar [sequelize]('https://sequelize.org/master/')
### Uso
para el sistema de voto se escoje un candidato, se pone la ci y se vota

se obtiene en candidato ganador actual, con el boton get winner

se obtienen las estadisticas de todos los candidatos con get stats