export class Telefone {
  #id;
  #idCliente;
  #numero;
  //#dataCad;

  constructor(idCliente, numero) {
    this.#idCliente = idCliente;
    this.#numero = numero;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  get idCliente() {
    return this.#idCliente;
  }
  
  set idCliente(value) {
    this.#validarIdCliente(value);
    this.#idCliente = value;
  }



  // --- Validação --- //

  #validarId(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O id deve ser válido");
    }
  }

  #validarIdCliente(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O idCliente deve ser válido");
    }
  }
}
