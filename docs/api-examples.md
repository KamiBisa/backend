# API Examples

Here are example requests and responses for each available API

___

## Authentication

### Register

Request
```
POST /api/postRegister HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*
Content-Length: 69

{
    "username": "qwe",
    "password": "asd",
    "role": "donor"
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Set-Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NjY0Nzc3LCJleHAiOjE2MjkyNjk1Nzd9.imDiGkfgHaIDYGbzJ0pQ7c9joV-84lPLyA0VnoUGE0k; Path=/; Expires=Wed, 18 Aug 2021 06:52:57 GMT; HttpOnly
Content-Type: application/json; charset=utf-8
Content-Length: 298
ETag: W/"12a-MmepkpRUZ0XCas0jsz3RqofURrU"
Date: Wed, 11 Aug 2021 06:52:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4Njc0NTQyLCJleHAiOjE2MjkyNzkzNDJ9.0VyCLsFVMgNp0tw4yRjaVA4ZKVeuYlLTqsEYtI5f_IQ",
    "user": {
        "username": "qwe",
        "password": "$2b$12$KeSIyOCu/Lrli4p8sheMku5rcEVL3PAKdQUmYFZRqDtikMOeH2ls2",
        "role": "donor",
        "is_verified": true
    }
}
```

### Login

Request
```
POST /api/postLogin HTTP/1.1
Content-Type: application/json
Accept: */*
Host: localhost:8080
Content-Length: 51

{
    "username": "qweqwe",
    "password": "asd"
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Set-Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4NjcxNjM2LCJleHAiOjE2MjkyNzY0MzZ9.lKnDHAT03TsS015ugMiS4KP6apXWUNKW4TNZC8wT0gw; Path=/; Expires=Wed, 18 Aug 2021 08:47:16 GMT; HttpOnly
Content-Type: application/json; charset=utf-8
Content-Length: 318
ETag: W/"13e-d81kJw4w9143lMYJoFPlhgijDn0"
Date: Wed, 11 Aug 2021 08:47:16 GMT
Connection: keep-alive
Keep-Alive: timeout=5
 
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4NjcxNjM2LCJleHAiOjE2MjkyNzY0MzZ9.lKnDHAT03TsS015ugMiS4KP6apXWUNKW4TNZC8wT0gw",
    "user": {
        "user_id": 3,
        "username": "qweqwe",
        "password": "$2b$12$/V91AUpgkEV5XYYCjw/7N.QkBMtYsqCOtH6JsrJHlCESNffpsDsRu",
        "role": "fundraiser",
        "is_verified": null
    }
}
```

### Logout

Request
```
GET /api/getLogout HTTP/1.1
Accept: */*
Host: localhost:8080
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjI4Njc2NjIyLCJleHAiOjE2MjkyODE0MjJ9.vFdBJJStX_jy2APDbSDN6d2mOS9wtOBUwXN3jVAqWH4
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Set-Cookie: auth_token=j%3Anull; Path=/; Expires=Wed, 11 Aug 2021 10:13:25 GMT; HttpOnly
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-CoWKLm+xUMtUfrA8TGhbfA2YHB4"
Date: Wed, 11 Aug 2021 10:13:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5
 
{
    "success": true,
    "message": "User has been logout."
}
```

## Ewallet

### Add money

Request
```
POST /api/postUpdateEWallet/3/increase HTTP/1.1
Content-Type: application/json
Accept: */*
Host: localhost:8080
Connection: keep-alive
Content-Length: 20
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjI4Nzc2NzM4LCJleHAiOjE2MjkzODE1Mzh9.yS53JZq_Chdj5-kAtcz8IYD_GUZduZgI0JfZok79g64
 
{
    "balance":10
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 70
ETag: W/"46-bIhIZMlmRvFnmLhFN2qrMlEXLzs"
Date: Thu, 12 Aug 2021 13:59:22 GMT
Connection: keep-alive
Keep-Alive: timeout=5
 
{
    "success": true,
    "eWallet": {
        "user_id": 17,
        "wallet_id": "3",
        "balance": 10
    }
}
```

### Deduct money

Request
```
POST /api/postUpdateEWallet/3/decrease HTTP/1.1
Content-Type: application/json
Accept: */*
Host: localhost:8080
Connection: keep-alive
Content-Length: 19
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjI4Nzc2NzM4LCJleHAiOjE2MjkzODE1Mzh9.yS53JZq_Chdj5-kAtcz8IYD_GUZduZgI0JfZok79g64
 
{
    "balance":5
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 69
ETag: W/"45-GVaDRJMNTxLZh8ByhCSshHEW+/k"
Date: Thu, 12 Aug 2021 13:59:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "eWallet": {
        "user_id": 17,
        "wallet_id": "3",
        "balance": 5
    }
}
```

### endpoint

Request
```
```

Response
```
```
