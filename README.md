## README 6.-expressServer
#### Read laziness? follow the [link](ayavolk.ga) :link:

#### But there is nothing beautiful :flushed:

<br>
<h1 align='center'>
  <strong>"API express server"</strong>  
</h1>

### Project description
  + API server of Express JS with MongoDB
  + implemented registration, receiving a token
  + add user, view user card or cards
  + adding / viewing / deleting photos with the description and indication of the author
_____

<h2 align='center'>
  <strong>"How to use it all"</strong>  
</h2>

### Where to send requests - URL
```
84.201.175.41 | www.ayavolk.ga | ayavolk.ga
```

### Very briefly about requests
```
POST ayavolk.ga/signup     - new user registration
POST ayavolk.ga/signin     - user login and token receiving

GET  ayavolk.ga/users      - getting information about all users
GET  ayavolk.ga/users/:id  - getting information about a specific user

POST ayavolk.ga/cards      - creating a new card
GET  ayavolk.ga/cards      - getting information about all cards
DEL  ayavolk.ga/cards/:id  - deleting a specific card

If something went wrong, you will find out about it. The server will tell and show everything.
More on errors below.
```
_____

<h3 align='center'>
  <strong>"Tedious and long about requests and answers"</strong>  
</h3>

#### Add new user
```
POST ayavolk.ga/signup
  body {
          "name": "yourName",             // name       - minimun 2 && maximum 30 symbols
          "about": "aboutYou",            // about      - minimun 2 && maximum 30 symbols
          "avatar": "linkYouAvatar",      // avatar     - valid and existing link to the avatar
          "email": "yourEmail",           // email      - valid and existing email
          "password": "password"          // password   - minimun 8 symbols
       }
        
Upon successful registration, a new user is created and you will receive information about him in the response:
  {
    "data": {
              "_id": "5eeaadde1f786a0f7a3edec2",
              "name": "Anton",
              "about": "I do not eat, I do not sleep",
              "avatar": "https://anyLink.ru",
              "email": "volkovanton71@yandex.ru",
              "__v": 0
            }
  }       
```

#### User login and token receiving
```
POST ayavolk.ga/signin
  body {
          "email": "yourEmail",           // email      - valid and existing email
          "password": "password"          // password   - minimun 8 symbols
       }
     
Upon successful login, you will receive a token in the response:
  {
    "token":  "here will be your token"
  }  
  
Сopy token and use.
```

#### Getting information about all users 
```
GET  ayavolk.ga/users 
  header: {token: 'paste your token'}
     
If you successfully request information from all users in the response, you will receive an array with users:
   {
    "data": [
      { info user }, 
      { info user },
      ... ,
      { ... }
    ] 
   }
```

#### Getting information about a specific user
```
GET  ayavolk.ga/users/:id
  header: {token: 'paste your token'}

  id - user _id

If you successfully request information from a specific user in the response you will get an object with information about it:
   {
    "data": {
        "_id": "5eeaadde1f786a0f7a3edec2",
        "name": "Anton",
        "about": "I do not eat, I do not sleep",
        "avatar": "https://anyLink.ru",
        "email": "volkovanton71@yandex.ru",
        "__v": 0
    }
  }
```

#### Creating a new card
```
POST ayavolk.ga/cards
  header: {token: 'paste your token'}
  body {
          "name": "card name",               // name      - minimun 2 && maximum 30 symbols
          "link": "https://anyLink.ru"       // password  - valid and existing link to the card
       }
     
If you successfully create a card in response, you will receive an object with this card:
  {
    "data": {
        "likes": [],
        "createdAt": "2020-06-18T00:29:41.894Z",
        "_id": "5eeaba82da20fb0fc51358b5",
        "name": "Moscow city",
        "link": "https://anyLink.ru",
        "owner": "5eeaa1508c25800f5c09c1fa",
        "__v": 0
    }
  }  
```

#### Getting information about all cards 
```
GET  ayavolk.ga/cards 
  header: {token: 'paste your token'}
     
If you successfully request information from all cards in the response, you will receive an array with cards:
   {
    "data": [
      { info card }, 
      { info card },
      ... ,
      { ... }
    ] 
   }
```

#### Deleting a specific card
```
DEL ayavolk.ga/cards/:id
 header: {token: 'paste your token'}
 
id - card _id
     
If you successfully delete a specific card in the response, you will receive an object with information about this card:
  {
    "data": {
        "likes": [],
        "createdAt": "2020-06-18T00:29:41.894Z",
        "_id": "5eeabb6bda20fb0fc51358b6",
        "name": "Moscow city",
        "link": "https://anyLink.ru",
        "owner": "5eeaa1508c25800f5c09c1fa",
        "__v": 0
    }
  }  
```
_____

<h3 align='center'>
  <strong>"What awaits you with a bad request - ERRORS"</strong>  
</h3> 

#### Bad request - error status 400

  + invalid data in request body
  
```
 Sample response text

  {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "\"name\" length must be at least 2 characters long",
      "validation": {
          "source": "body",
          "keys": [
              "name"
          ]
      }
  }
```

#### Unauthorized - error status 401

  + invalid credentials
   
```
 Sample response text
   
   {
      "message": "Неправильные почта или пароль"
   }
```
 
#### Forbidden - error status 403

  + delete not your card
 
```
 Sample response text
   
   {
    "message": "Вы не можете удалить карточку, которую не создавали"
   }
```
 
#### NotFound - error status 404

  + user not found
  + card not found when deleting
  + nonexistent request
 
```
 Sample response text
   
   {
    "message": "Карточки с данным _id не существует"
   }
```

#### Conflict - error status 409

  + create an existing user
 
```
 Sample response text
   {
    "message": "Пользователь с таким email уже существует"
   }
```

#### Internal Server Error - error status 500

  + server is offended and does not want to talk
 
```
 Sample response text
   
   {
    "message": "Ошибка на сервере"
   }
```
____


#### Автор проекта: Антон Волков. :bowtie:

#### Техническое задание и ревью: ребята из Яндекса. :+1:

____
