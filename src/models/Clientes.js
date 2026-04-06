export class Clientes{
    #id
    #nome
    #cpf
    #cep
    #rua
    #localidade
    #complemento
    #uf
    //#dataCad

    constructor(Nome, valor, idCategoria, caminhoImagem, id) {
    this.#nome = Nome;
    this.#cpf = valor;
    this.#cep = idCategoria;
    
  }


}