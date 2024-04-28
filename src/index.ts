import { Elysia } from "elysia";
import { getUsers } from "./users/usersHandler";
import { getConnection } from "./db/dbHandler";
import { getSchools } from "./schools/schoolsHandler";

const app = new Elysia();


app.get("/users", async () => {
  try {
    const connection = await getConnection();
    const users = await getUsers(connection);
    return users;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
});

app.get("/schools", async () => {
  try {
    const connection = await getConnection();
    const schools= await getSchools(connection);
    return schools;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
});

app.listen(3000);
console.log(
  `🦊 Elysia is running at http://localhost:3000`
);
