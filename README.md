# Tickets

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

# IMPORTANT

### > **Envs files open because it is tutorial project don't do it in your production!**

---

## Development server

Run `docker compose up` in root directory (That run rabbitmq & 2 mysql instances)

Run `nx run-many --target=serve --all --parallel=10` to run all services. 

---

## API

- If you want to use postman or insomnia import `requests.har` file into your app


### Auth 
- `POST http://localhost:3333/api/auth/login` - **REQUEST** `
{
  "email": "user@mail.com",
  "password": "123"
}
`

- `POST http://localhost:3333/api/auth/register` - **REQUEST** `
{
  "email": "user@mail.com",
  "password": "123",
  "fullName": "User"
}
`

### Ticket

- `GET http://localhost:3333/api/support/ticket/1`  
- `POST http://localhost:3333/api/support/ticket` 
 **REQUEST** `
{
"question": "Hello this is first question"
}
`
- `PUT http://localhost:3333/api/support/ticket/1/status`
  **REQUEST** `
  {
  "status": "CLOSED"
  }
  `
- `POST http://localhost:3333/api/support/ticket/1/answer`
  **REQUEST** `
  {
  "answer": "I am answered to you"
  }
  `
---

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.
