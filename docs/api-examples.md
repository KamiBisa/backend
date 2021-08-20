# API Examples

Here are example requests and responses for each available API

- [API Examples](#api-examples)
  - [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
    - [Logout](#logout)
    - [User Info](#user-info)
  - [Ewallet](#ewallet)
    - [Add money](#add-money)
    - [Deduct money](#deduct-money)
  - [Notification](#notification)
    - [View all notifications](#view-all-notifications)
    - [View fundraiser proposal notifications](#view-fundraiser-proposal-notifications)
    - [View new donation program notifications](#view-new-donation-program-notifications)
    - [View new withdrawal notifications](#view-new-withdrawal-notifications)
  - [Donation Program](#donation-program)
    - [Create new donation program](#create-new-donation-program)
    - [List verified donation programs](#list-verified-donation-programs)
    - [List donation programs owned by a fundraiser](#list-donation-programs-owned-by-a-fundraiser)
    - [Detail info of a donation program](#detail-info-of-a-donation-program)
  - [Donation](#donation)
    - [Make a donation](#make-a-donation)
    - [View past donations](#view-past-donations)
  - [Verification](#verification)
    - [Verify new fundraiser account](#verify-new-fundraiser-account)
    - [Verify new donation program creation](#verify-new-donation-program-creation)
    - [Verify new withdrawal](#verify-new-withdrawal)
  - [Withdrawal](#withdrawal)
    - [Make a withdrawal request](#make-a-withdrawal-request)
    - [Get all withdrawals](#get-all-withdrawals)

___

## Authentication

### Register

Request
```
POST /api/authentication/postRegister HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*
Content-Length: 69

{
    "fullname": "user 1",
    "username": "user1",
    "email": "user1@gmail.com",
    "password": "user1_",
    "avatar": "https://image.flaticon.com/icons/png/512/21/21104.png",
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
POST /api/authentication/postLogin HTTP/1.1
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
GET /api/authentication/getLogout HTTP/1.1
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

### User Info

Request
```
GET /api/authentication/getUserInfo HTTP/1.1
Accept: */*
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 235
ETag: W/"eb-rdyG9CHdPFW/zdPa+lQR/1GprZ8"
Date: Wed, 18 Aug 2021 11:27:58 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "userData": {
        "user": {
            "user_id": 1,
            "fullname": "asd",
            "username": "asd",
            "email": "asd",
            "avatar": null,
            "password": "$2b$12$UHXCYC.N5hfHF3DKO5oI2eEmwDcJ2vabfQEhybhpd7gzWPk/TndhO",
            "role": "fundraiser",
            "is_verified": 0
        },
        "history": []
    }
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

## Notification

### View all notifications

Request
```
GET /api/notification/view HTTP/1.1
Accept: */*
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 220
ETag: W/"dc-ZCM6nKpEpw7pIYVEHtIMS2JLMvE"
Date: Wed, 18 Aug 2021 11:34:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
    {
        "notification_id": 6,
        "user_id": 2,
        "program_id": null,
        "withdrawal_id": null
    },
    {
        "notification_id": 7,
        "user_id": null,
        "program_id": 1,
        "withdrawal_id": null
    },
    {
        "notification_id": 8,
        "user_id": null,
        "program_id": null,
        "withdrawal_id": 3
    }
]
```

### View fundraiser proposal notifications

Request
```
GET /api/notification/view/fundraisers HTTP/1.1
Accept: */*
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 74
ETag: W/"4a-GpA6Qx62jKygrqjHP+DCCR6kABM"
Date: Wed, 18 Aug 2021 11:35:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
    {
        "notification_id": 6,
        "user_id": 2,
        "program_id": null,
        "withdrawal_id": null
    }
]
```

### View new donation program notifications

Request
```
GET /api/notification/view/fundraisers HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: b3434c83-e680-4ed1-a0b3-ac8f83fb4b42
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 74
ETag: W/"4a-GpA6Qx62jKygrqjHP+DCCR6kABM"
Date: Wed, 18 Aug 2021 11:35:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
    {
        "notification_id": 6,
        "user_id": 2,
        "program_id": null,
        "withdrawal_id": null
    }
]
```

### View new withdrawal notifications

Request
```
GET /api/notification/view/withdrawals HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: b7ed4b6b-ab08-4bcb-abe2-9eeb36494b8f
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 74
ETag: W/"4a-zbal9T72dtmredQFKxaIesJBkA8"
Date: Wed, 18 Aug 2021 11:37:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
    {
        "notification_id": 8,
        "user_id": null,
        "program_id": null,
        "withdrawal_id": 3
    }
]
```

## Donation Program

### Create new donation program

Request
```
```

Response
```
```

### List verified donation programs

Request
```
GET /api/donation_program/getVerifiedDonationProgram HTTP/1.1
Accept: */*
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 155
ETag: W/"9b-T9cXBCJnBhJdaeolYyd5ZCzOXdE"
Date: Wed, 18 Aug 2021 11:45:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "donation_program": [
        {
            "program_id": 1,
            "user_id": 1,
            "wallet_id": 1,
            "name": "asd",
            "description": "qwe",
            "image_url": "",
            "is_verified": 1,
            "goal": 100
        }
    ]
}
```

### List donation programs owned by a fundraiser

Request
```
GET /api/donation_program/getOwnDonationProgramList HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: 9bad0f7c-725f-480b-97be-f5e297d2360f
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 155
ETag: W/"9b-T9cXBCJnBhJdaeolYyd5ZCzOXdE"
Date: Wed, 18 Aug 2021 11:47:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "donation_program": [
        {
            "program_id": 1,
            "user_id": 1,
            "wallet_id": 1,
            "name": "asd",
            "description": "qwe",
            "image_url": "",
            "is_verified": 1,
            "goal": 100
        }
    ]
}
```

### Detail info of a donation program

Request
```
GET /api/donation_program/getDonationProgramInfo/1 HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: d606e4b3-5b0e-406d-a7f5-884fb90a8fa6
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 157
ETag: W/"9d-+MSCr/TccksxzushhklHqN6rPe8"
Date: Wed, 18 Aug 2021 11:48:48 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "data": {
        "program_id": 1,
        "user_id": null,
        "wallet_id": 1,
        "name": "asd",
        "description": "qwe",
        "image_url": "",
        "is_verified": 1,
        "goal": 100,
        "balance": 90
    }
}
```

## Donation

### Make a donation

Request
```
POST /api/donation/postDonate/1 HTTP/1.1
Content-Type: application/json
Accept: */*
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 20
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5Mjg3NjI0LCJleHAiOjE2Mjk4OTI0MjR9.JcW1alqI78ogEfvhgLYtRUPfwoXaVmYX2rb87c7mZMo
 
{
    "amount": 10
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 125
ETag: W/"7d-Hp7GGF1BQ2IEp8WnpLQZ7TO/i8k"
Date: Wed, 18 Aug 2021 11:53:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "donation": {
        "donation_id": 2,
        "program_id": "1",
        "user_id": 2,
        "timestamp": "2021-08-18T11:53:47.077Z",
        "amount": 10
    }
}
```

### View past donations

Request
```
GET /api/donation/getPastDonations HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: d3e54bb2-25bb-4f2d-af44-3744fe985bd7
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5Mjg3NjI0LCJleHAiOjE2Mjk4OTI0MjR9.JcW1alqI78ogEfvhgLYtRUPfwoXaVmYX2rb87c7mZMo
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 193
ETag: W/"c1-F7JbcjAhA3PolgfdvFx+dwmpfb8"
Date: Wed, 18 Aug 2021 11:54:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
    {
        "donation_id": 2,
        "program_id": 1,
        "user_id": 2,
        "timestamp": "2021-08-18T12:01:53.000Z",
        "amount": 15
    },
    {
        "donation_id": 1,
        "program_id": 1,
        "user_id": 2,
        "timestamp": "2021-08-18T12:01:48.000Z",
        "amount": 10
    }
]
```

## Verification

### Verify new fundraiser account

Request
```
GET /api/verification/getVerifyFundraiser/1/reject HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: 8a4a60ec-8e1c-4d39-8d52-ec16a2ea3021
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5Mjg3NjI0LCJleHAiOjE2Mjk4OTI0MjR9.JcW1alqI78ogEfvhgLYtRUPfwoXaVmYX2rb87c7mZMo
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 223
ETag: W/"df-CYWlLxduTU8cG7M87zObwFC1apo"
Date: Wed, 18 Aug 2021 12:04:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "message": "Fundraiser status with id 1 has been changed.",
    "user": {
        "id": "1",
        "username": "asd",
        "password": "$2b$12$UHXCYC.N5hfHF3DKO5oI2eEmwDcJ2vabfQEhybhpd7gzWPk/TndhO",
        "role": "fundraiser",
        "is_verified": false
    }
}
```

### Verify new donation program creation

Request
```
GET /api/verification/getVerifyDonationProgram/1/verify HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: f6780278-c755-4038-a795-e0b80f9dff2d
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5Mjg3NjI0LCJleHAiOjE2Mjk4OTI0MjR9.JcW1alqI78ogEfvhgLYtRUPfwoXaVmYX2rb87c7mZMo
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 73
ETag: W/"49-Q8z4QI7GQQwISJ+UaWMsADX34nk"
Date: Wed, 18 Aug 2021 12:05:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "donation_program": {
        "program_id": "1",
        "is_verified": true
    }
}
```

### Verify new withdrawal

Request
```
GET /api/verification/getVerifyWithdrawal/3/verify HTTP/1.1
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: 4d62e402-9c85-4d12-9ccc-7b8592292fc5
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5Mjg3NjI0LCJleHAiOjE2Mjk4OTI0MjR9.JcW1alqI78ogEfvhgLYtRUPfwoXaVmYX2rb87c7mZMo
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 58
ETag: W/"3a-Hvo4ugLgGhgM3726U33h2PJo+sk"
Date: Wed, 18 Aug 2021 12:06:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "message": "Withdrawal has been approved."
}
```

## Withdrawal

### Make a withdrawal request

Request
```
POST /api/withdrawal/postWithdrawDonationProgram/1 HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: 75dfec3c-ef68-486d-bd14-2a9285b348b2
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 20
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5Mjg4NDgwLCJleHAiOjE2Mjk4OTMyODB9.OiZm_9ogEFy3YBe1pxl879I29nVLX677ux1pN0pKl-k
 
{
    "amount": 10
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 117
ETag: W/"75-wHGAWdWmTaBlpmJMbL9c9OUY+Ec"
Date: Wed, 18 Aug 2021 12:08:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "withdrawal": {
        "withdrawal_id": 4,
        "program_id": "1",
        "amount": 10,
        "timestamp": "2021-08-18T12:08:55.859Z"
    }
}
```

### Get all withdrawals

Request
```
GET /api/withdrawal/getAllWithdrawals HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.28.3
Accept: */*
Postman-Token: 8a35271f-6943-4f1d-8b1a-9fdccdbec7b4
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 20
Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5Mjg4NDgwLCJleHAiOjE2Mjk4OTMyODB9.OiZm_9ogEFy3YBe1pxl879I29nVLX677ux1pN0pKl-k
 
{
    "amount": 10
}
```

Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 443
ETag: W/"1bb-gHYhourX+a5e/eO/jqX7bDcPX1o"
Date: Wed, 18 Aug 2021 12:10:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "withdrawal": [
        {
            "withdrawal_id": 1,
            "program_id": 1,
            "is_verified": 1,
            "amount": 100,
            "timestamp": "2021-08-17T17:00:00.000Z"
        },
        {
            "withdrawal_id": 2,
            "program_id": 1,
            "is_verified": 1,
            "amount": 10,
            "timestamp": "2021-08-17T17:00:00.000Z"
        },
        {
            "withdrawal_id": 3,
            "program_id": 1,
            "is_verified": 1,
            "amount": 10,
            "timestamp": "2021-08-17T17:00:00.000Z"
        },
        {
            "withdrawal_id": 4,
            "program_id": 1,
            "is_verified": null,
            "amount": 10,
            "timestamp": "2021-08-17T17:00:00.000Z"
        }
    ]
}
```
