###Password Manager Project - (Backend) - [Frontend](https://github.com/ArunAaryan/PasswordManagerReact)

###### Hobby Coding Project - Save encrypted credentials, decrypt credential on request, rehash all passwords with new secret, Http Only cookie for security, JWT verify, No Storing master keys on DB. Cookie safety left to browser security ( mostly secure ) as of now.

#### Status : <font color = "#4ADD2F"> Ongoing </font>

##### Stack : Node, Express, MongoDB.

Key Cases :

- [x] 1. Encryption, Decryption of Credentials on request
- [x] 2. Http Only Cookie
- [x] 3. Jwt token on Http Only cookie
- [x] 4. Rehash all passwords on password change
- [x] 5. Private routes verify - Middleware
- [ ] 6. Refresh Token
- [ ] 7. CSRF
- [ ] 8. Auth0
     <br/>
- Uses Joi for form validation
- Bcrypt for password hashing
- Crypto for encryption and decryption
- Mongoose ORM
- Postman for testing

Routes : Public  
<font color = "orange" > /auth/login </font>

```
{
    "email":"someone@example.com",
    "password":"example password"
}
```

> response :
> 200 OK or 401
> {

    "message": "logged in "

}

<font color = "orange" > /auth/signup </font>

```
{
    "username" : "someone",
    "email":"someone@example.com",
    "password":"examplepassword",
    "confirm_password":"examplepassword"
}
```

> response : Only for Dev
> {

    "username: "someone",
     "email": "someone@example.com",
    //"password":"$2b$10$74GZ6FKa.....",
    "records": [],
    "_id": "61653c4aea2a...",

}
<font color = "orange">
/auth/logout
</font>

> clears cookies on client

```
{
    message : "logged out"
}
```

Routes : Private

<font color = "orange" >/records/getallcredentials</font>

> response

```
 [{
"_id": "615e7833e4a8f88c",
"username": "Github",
"url": "github.com",
"encryptedData": "723b723ccd3ba23f2e745cf14c536575eb6e5d03c753f145e7863d364e6d9b30cb42b9484c4787b379fdcfbc38bd1830d2940a4e35e",
"__v": 0
},
{
"_id": "615e83528abe88b9",
"username": "Facebook",
"url": "www.facebook.com",
"encryptedData": "dc981279505df88fefc7efd255cd9d8369536bfe21793164de1ad53eedc9b86ad577fa68",
"__v": 0
}
]
```

<font color = "orange" >/records/decryptcredentials</font>

```
{
"recordId":"6149b02f519s35d7ac5d7"
//example mongoose id
}
```

> response :

```
 {
"id": "6149b02f519s355d7ac5d7",
 "username": "Facebook",
 "url": "www.facebook.com",
 "encryptedData": "dc981279505df88fd255cd9d8369536bfe21793164de1ad53eedc9b86ad577fa68",
 "v": 0
 }
```

<font color = "orange">
/records/new
</font>

```
{
    "username_e":"someone",
    "password_e":"somepassword",
    "url_e" : "someone@example.com"
}
```

> response
> {

    "message": "record saved",
    "id": "61653eb80ca2f....."

}

<font color = "orange">
records/re-encrypt
</font>
```
{
    "userid":"61fee7a3fda0...",
    "oldSecret":"old_secret_",
    "newSecret":"_new_secret"
}
```
> response : takes time depending on no. of records
```
[{
 <updated records...>
}]
```
