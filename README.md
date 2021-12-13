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

### Uso
para el sistema de voto se escoje un candidato, se pone la ci y se vota

se obtiene en candidato ganador actual, con el boton get winner

se obtienen las estadisticas de todos los candidatos con get stats