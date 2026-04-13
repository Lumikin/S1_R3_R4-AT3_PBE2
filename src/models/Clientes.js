export class Clientes {
  #id;
  #nome;
  #cpf;
  //#dataCad

  constructor(nome, cpf, cep, rua, localidade, complemento, uf, id) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  get nome() {
    return this.#nome;
  }

  set nome(value) {
    this.#validarNome(value);
    this.#nome = value;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(value) {
    this.#validarCpf(value);
    this.#cpf = value;
  }

  // --- Validação --- //

  #validarId(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O id deve ser válido");
    }
  }

  #validarNome(value) {
    if (!value || value.trim() === "") {
      throw new Error("O idCliente deve ser válido");
    }
  }

  #validarCpf(value) {
    if (isNaN(value) || value.trim() <= 0 || !value) {
      throw new Error("Digite um CPF válido!");
    }
  }

  static criar(dados) {
    return new Clientes(dados.nome, dados.cpf, null);
  }
}
