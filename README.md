# O projeto

O projeto foi criado utilizando o 'Create React App' mas sem bibliotecas externas, seja para o uso de funções ou CSS.

## Como rodar

### Para iniciar o projeto é necessário que a API utilizada esteja rodando
[FAKE-API](https://github.com/eqi-investimentos/desafio-fake-api)

Para executar a API basta fazer o clone/download do repositório acima e na pasta executar:

### `npm install` 
### `npx json-server db.json` 

A API fica localizada em http://localhost:3000.
Como utilizar ela também está exposto no repositório da mesma.

## Após iniciar a API

Deve ser executado o comando abaixo, ele vai informar que a porta padrão 3000 já está sendo usada e se pode executar na próxima porta disponível (que geralmente é a 3001).

### `npm start`

O app vai estar rodando no formato de desenvolvimento.\
Abra [http://localhost:3001](http://localhost:3001) para ver no navegador.\
A página será recarregada com novas alterações salvas no código.

## Versão de produção

Para compilar uma versão de produção deve ser rodado o comando abaixo:

### `npm run build`

Ele vai compilar e guardar uma versão na pasta `build`.\
Essa versão é compilada com o React no modo de produção onde tudo é minimizado pensando em performance.


