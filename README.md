# bw3-devdesk-queue-backend

Backend for DevDesk Queue

## Technical Design Document

https://devdesk-queue.herokuapp.com

## User Database Endpoints

#### All endpoints require tokens in header. role requirements specified in each endpoint which requires a role.

#### header example

```js
{
 "Authorization": "token",
 "role": "student" || "helper"
}
```

## [POST] Register

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

## [POST] Login

`/api/auth/login`

**Payload** Expects an object with a username and password, **Returns** a security token

```js
{
    "username": "jay",
    "password": "pass"
}
```

## [GET] All users

`/api/users`

**Returns** a list of all registered users

## [GET] A single user by id

`/api/users:id`

**Returns** the user by id specified on the endpoint

## [DELETE] Users

`api/users/:id`

### Tickets Database Endpoints

## [POST] Tickets

#### header example

```js
{
 "Authorization": "token",
 "role": "student"
}
```

`/api/tickets`

**Payload** Expects an object with a status, title, description & student_id (Optional: tried and helper_id)

```js
{
	"status": "test status",
	"title": "test title",
	"description": "test description",
  "student_id": "1",
  "categories": "javascript" // optional, & will only accept categories in the categories table
}
```

## [GET] Tickets

`/api/tickets/`

**Returns** a list of all posted help tickets

## [PUT] Tickets

#### header example

```js
{
 "Authorization": "token",
 "role": "helper"
}
```

`/api/tickets/:id`

**Payload** edit the status and helper_id, only open to helpers

```js
{
	"status": "complete"
}
```

## [DELETE] Tickets

#### header example

```js
{
 "Authorization": "token",
 "role": "helper"
}
```

`/api/tickets/:id`

## [POST] Categories

`/api/categories`

**Payload** Expects an object with a name

```js
{
  "name": "Javascript"
}
```

## [GET] All categories

`/api/categories`

**Returns** a list of all posted help tickets

## [GET] A single category by id

`/api/categories/:id`

**Returns** the category by id specified on the endpoint

## [PUT] Categories

`/api/categories/:id`

```js
{
  "name": "Javascript"
}
```

## [DELETE] Categories

`/api/categories/:id`
