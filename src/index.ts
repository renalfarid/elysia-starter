import { Elysia } from "elysia";
import { fetchUsers } from "./users/usersHandler";
import { getConnection } from "./db/dbHandler";
import { fetchSchools } from "./schools/schoolsHandler";
import { ResponseData } from "./lib/helper";

const app = new Elysia();
const encoder = new TextEncoder();

app.onError(({ code, error, set }) => {
  if (code === 'NOT_FOUND') {
    set.status = 404
    return error
  } 
  if (code === 'INTERNAL_SERVER_ERROR') {
    set.status = 500
    //const response = Response(false, set.status, {"message": error.message})
    return error
  } 
})

app.mapResponse(({ response, set }) => {
  const isJson = typeof response === 'object'

  const text = isJson
      ? JSON.stringify(response)
      : response?.toString() ?? ''

  set.headers['Content-Encoding'] = 'gzip'

  return new Response(
      Bun.gzipSync(encoder.encode(text)),
      {
          headers: {
              'Content-Type': `${
                  isJson ? 'application/json' : 'text/plain'
              }; charset=utf-8`
          }
      }
  )
})

app.get("/", () => {
   const welcome = {"message": "Welcome API"};
   const response = ResponseData(true, 200, welcome);
   return response;
})


app.get("/users", async () => {
    const connection = await getConnection();
    const users = await fetchUsers(connection)
    const response = ResponseData(true, 200, users);
    return response;
});

app.get("/schools", async () => {
    const connection = await getConnection();
    const schools= await fetchSchools(connection);
    const response = ResponseData(true, 200, schools)
    return response;
});

app.listen(3000);
console.log(
  `🦊 Elysia is running at http://localhost:3000`
);
