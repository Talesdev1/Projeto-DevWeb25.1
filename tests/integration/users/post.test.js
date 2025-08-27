const { faker } = require("@faker-js/faker");

describe("POST users /signup", () => {
  const firstName = faker.person.firstName();
  const username = faker.internet.username({ firstName });
  const email = faker.internet.email();
  const password = faker.internet.password();

  it("unique and valid data status code should be 201", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirm_password: password,
      }),
    });

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status).toBe(201);

    expect(responseBody).toEqual({
      id: responseBody.id,
      username: username,
      email: email,
      password: undefined,
      created_at: responseBody.created_at,
      updated_at: responseBody.updated_at,
      token: responseBody.token,
    });

    expect(Date.parse(responseBody.created_at)).not.toBeNaN();
    expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
  });

  it("duplicated email status code should be 409", async () => {
    await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirm_password: password,
      }),
    });

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirm_password: password,
      }),
    });

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status).toBe(409);

    expect(responseBody).toEqual({
      message: "email deve ser único",
    });
  });

  it("without email status code should be 400", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        confirm_password: password,
      }),
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toEqual({
      message: "O campo email é obrigatório",
    });
  });

  it("invalid email status code should be 400", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email: "@example.com",
        password,
        confirm_password: password,
      }),
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toEqual({
      message: "Formato de email inválido",
    });
  });

  it("without password status code should be 400", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
      }),
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toEqual({
      message: "O campo senha é obrigatório",
    });
  });

  it("confirm_password diferent from password status code should be 400", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirm_password: password + "2",
      }),
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toEqual({
      message: "Senhas não conferem",
    });
  });

  it("confirm_password diferent from password status code should be 400", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password: "Senha12",
        confirm_password: "Senha12",
      }),
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toEqual({
      message: "A senha deve ter pelo menos 8 caracteres",
    });
  });

  it("confirm_password diferent from password status code should be 400", async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password: "Senha12",
        confirm_password: "Senha12",
      }),
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toEqual({
      message: "A senha deve ter pelo menos 8 caracteres",
    });
  });

  afterEach(async () => {
    await fetch("http://localhost:3000/test/sync");
  });
});
