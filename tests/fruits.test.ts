import supertest from "supertest";
import app from "../src/index";
import { FruitInput } from "services/fruits-service";

const api = supertest(app);

it("should return all fruits", async () => {
  const result = await api.get("/fruits");

  expect(result.status).toBe(200);
  expect(result.body.length).toBeGreaterThanOrEqual(0);
});

it("should post a fruit", async () => {
  const fruit: FruitInput = {
    name: "Maracuja",
    price: 10.50,
  };

  const result = await api.post("/fruits").send(fruit);

  expect(result.status).toBe(201);
});

it("can't duplicate a fruit", async () => {
  const fruit: FruitInput = {
    name: "Maracuja",
    price: 10.50,
  };

  const result = await api.post("/fruits").send(fruit);

  expect(result.status).toBe(409);
});
