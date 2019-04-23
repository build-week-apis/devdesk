# bw3-devdesk-queue-backend
Backend for DevDesk Queue

## Technical Design Document
[TDD](https://docs.google.com/document/d/1NNdDonJhEtS1wGPb88NQR7Fg2C0gkBwX51sXeloip68/edit#)


https://devdesk-queue.herokuapp.com





### User Database Endpoints 

 ### [POST] Register
 
 `/api/auth/register` 

 **Payload:** Expects an object with a username, password and email 

```js
{
	  "email": "test2@gmail.com",
    "username": "jay",
    "password": "pass",
    "role": "student"
}
```

### [POST] Login

`/api/auth/login`

**Payload** Expects an object with a username and password, **Returns** a security token

```js 
{
    "username": "jay",
    "password": "pass"
}
```

### [GET] Users

`/api/users`

**Returns** a list of all registered users  

### Tickets Database Endpoints 

### [POST] Tickets

`/api/tickets` 

**Payload** Expects an object with a status, title, description & student_id (Optional: tried and helper_id) 

```js 
{
	"status": "test status",
	"title": "test title",
	"description": "test description",
	"student_id": "1"
}
```

 ### [GET] Tickets
 
 `/api/tickets`  
 
 **Returns** a list of all posted help tickets 


