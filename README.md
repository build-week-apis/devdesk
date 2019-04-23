# bw3-devdesk-queue-backend
Backend for DevDesk Queue

## Technical Design Document
[TDD](https://docs.google.com/document/d/1NNdDonJhEtS1wGPb88NQR7Fg2C0gkBwX51sXeloip68/edit#)


https://devdesk-queue.herokuapp.com


# back-end

| Endpoint | Description | example |
| --- | --- |
| User Database Endpoints |
| `POST /api/auth/register` | Expects an object with a username, password and email | `{
	    "email": "test2@gmail.com",
        "username": "jean",
        "password": "pass",
        "role": "student"
}` |
| `POST /api/auth/login` | Expects an object with a username and password, returns a security token |
| `GET /api/users` | Returns a list of all registered users |
| Tickets Database Endpoints |
| `POST /api/auth/tickets` | Expects an object with a status, title, description & student_id (Optional: tried and helper_id) |
| `GET /api/auth/tickets` | Returns a list of all posted help tickets |