describe("POST users /signup", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user",
          email: "user@user.dev",
          password: "senha123",
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();
      console.log(responseBody);

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "user",
        email: "user@user.dev",
        password: undefined,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
        token: responseBody.token,
      });
    });
  });
});
