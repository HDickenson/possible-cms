import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/shared/schema.ts",
  out: "../../migrations",
  dialect: "sqlite",
});
