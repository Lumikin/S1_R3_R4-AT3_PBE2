export class Enderecos {
  #id;
  #clienteId;
  #cep;
  #rua;
  #localidade;
  #complemento;
  #numero;
  #uf;
  //#dataCad
  
  constructor(id, clienteId, cep, rua, complemento, localidade, uf, numero) {
    this.#id = id;
    this.#clienteId = clienteId;
    this.#cep = cep;
    this.#rua = rua;
    this.#localidade = localidade;
    this.#complemento = complemento;
    this.#uf = uf;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  get clienteId() {
    return this.#id;
  }

  set clienteId(value) {
    this.#validarId(value);
    this.#id = value;
  }

  get cep() {
    return this.#cep;
  }

  set cep(value) {
    this.#validarCep(value);
    this.#cep = value;
  }

  // --- Validação --- //

  #validarCep(value) {
    if (!value || isNaN(value) || value.trim() <= 0) {
      throw new Error("Digite um CEP válido");
    }
  }

  #validarId(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O id deve ser válido");
    }
  }
}
