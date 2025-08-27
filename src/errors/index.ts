export default class BaseError extends Error {
  statusCode: number;
  type: string;
  constructor({
    type,
    path,
    message,
  }: {
    type: string;
    path?: string;
    message?: string;
  }) {
    super();
    this.type = type;
    switch (type) {
      case "bad_request": {
        this.statusCode = 400;
        this.message = message || "Corpo da requisição não pôde ser lido.";
        break;
      }
      case "confirm_password": {
        this.statusCode = 400;
        this.message = message || "Senhas não conferem";
        break;
      }
      case "password_length": {
        this.statusCode = 400;
        this.message = message || "A senha deve ter pelo menos 8 caracteres";
        break;
      }
      case "isEmail": {
        this.statusCode = 400;
        this.message = message || "Formato de email inválido";
        break;
      }
      case "is_null": {
        this.statusCode = 400;
        this.message = message || `O campo ${path} é obrigatório`;
        break;
      }
      case "not_unique": {
        this.statusCode = 409;
        this.message = message || `${path} deve ser único`;
        break;
      }
      default: {
        this.statusCode = 500;
        this.message = "Erro interno no servidor.";
        break;
      }
    }
  }
}
