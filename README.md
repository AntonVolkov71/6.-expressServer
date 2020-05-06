# 6.-expressServer

## README

##### Version 0.0.1

<br>
<h2 align='center'>
  <strong>"express server"</strong>  
</h2>

### здесь будет описание...

### Для разработчиков

```
Копировать проект на локальный репозиторий

  $git clone https://github.com/AntonVolkov71/6.-expressServer.git [путь до папки, куда копируем]
```

```
Установка зависимостей из package.json

  $npm install

Установка отдельного пакета

  $npm install <package-name>
```

```
Запуск настроенных скриптов для сборки

  $npm run dev - запуск сервера на локальном хосте с порта 3000 в режиме hot reload

  $npm run start - запуск сервера на локальном хосте с порта 3000

  $npm run eslint - проверка файлов .js Eslint -> airbnb-base

  $npm run ooda - автопомощник Eslint

```

### Запросы

#### Главная страница

  ```
  URL - http://localhost:3000
  ```
  
  
#### Получить карточку пользователя 

```
GET
 
  localhost:3000/users/:id 
 
 
URL параметры    

  id = [id_пользователя]
 
 
Ответ от сервера - пользователь найден в базе
 
  {
     "name":"Bret Victor",
     "about":"Designer, engineer",
     "avatar":"https://postlight.com/wp-content/uploads/2018/03/109TC-e1535047852633.jpg",
     "_id":"8340d0ec33270a25f2413b69"
   }


Ответ от сервера - пользователь не найден в базе 
 
   { message: 'Нет пользователя с таким id' }
 
 ```
 
#### Получить карточки всех пользователей

 ```
URL - http://localhost:3000/users
  
  
Ответ от сервера 
 
 [
    {
       "name":"Bret Victor",
       "about":"Designer, engineer",
       "avatar":"https://postlight.com/wp-content/uploads/2018/03/109TC-e1535047852633.jpg",
       "_id":"8340d0ec33270a25f2413b69"
     },

     { ... }
 ]
  
  ```

#### Получить карточки всех фотографий

 ```
URL - http://localhost:3000/cards
  
  
Ответ от сервера 
 
 [
     {
        "likes": [
            { ... }
        ],
        "_id": "5d208fb50fdbbf001ffdf72a",
        "name": "Иваново",
        "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        "owner": {
            "name": "Bret Victor",
            "about": "Designer, engineer",
            "avatar": "https://postlight.com/wp-content/uploads/2018/03/109TC-e1535047852633.jpg",
            "_id": "8340d0ec33270a25f2413b69"
        },
        "createdAt": "2019-07-06T12:10:29.149Z"
    },

     { ... }
 ]
  
  ```

#### Несуществующие запросы

 ```
Ответ от сервера 

  { message: 'Запрашиваемый ресурс не найден' }
  
```

---

#### Автор проекта: Антон Волков. :bowtie:

#### Техническое задание и ревью: ребята из Яндекса. :+1:

---
