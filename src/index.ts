import { Elysia } from "elysia";
import { fetchUsers } from "./users/usersHandler";
import { getConnection } from "./db/dbHandler";
import { fetchSchools } from "./schools/schoolsHandler";
import { Response } from "./lib/helper";

const app = new Elysia();

app.get("/", () => {
   const welcome = {"message": "Welcome API"};
   const response = Response(true, 200, welcome);
   return response;
})


app.get("/users", async () => {
  try {
    const connection = await getConnection();
    const users = await fetchUsers(connection)
    const response = Response(true, 200, users);
    return response;
  } catch (error) {
    console.log("Error: ", error);
    const errorResponse = Response(false, 500, error)
    return errorResponse;
  }
});

app.get("/schools", async () => {
  try {
    const connection = await getConnection();
    const schools= await fetchSchools(connection);
    const response = Response(true, 200, schools)
    return response;
  } catch (error) {
    console.log("Error: ", error);
    const errorResponse = Response(false, 500, error)
    return errorResponse;
  }
});

app.listen(3000);
console.log(
  `🦊 Elysia is running at http://localhost:3000`
);
