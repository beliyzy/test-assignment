## Тестовое задание

### Порядок действий для развертывания проекта
1. Клонировать репозиторий `git clone git@github.com:xenon-96-31-10/test-assignment.git`
2. Настроить соединение с БД на локальном сервере (или где удобно)
   1. Создать БД (test_assignment или свое название)
   2. Указать данные для БД в файле `.env`
3. Через терминал в корневой папке проекта запустить следующие команды
    1. `composer install`
    2. `npm i && npm run dev`
    3. `php artisan key:generate`
    4. `php artisan migration`
    5. `php artisan route:cache`
    6. `php artisan db:seed`
    7. `php artisan serve` - если Вы используете LAMP|XAMP и аналоги, но лучше поставить [Laravel Homestead](https://laravel.com/docs/8.x/homestead) (даже для обычных проектов он крут и дает много плюсов)
    8. `npm run watch || npm run watch-poll`

### Если возникают ошибки, то скорее всего они уже описаны в интернете :) 
* Убедитесь что у Вас есть composer
* Добавьте оператор php для работы с ним в командной строке
* Установить NODE.JS для работы с npm

## Суть тестового задания
```
Мы для Вас заготовили тестовую структуру БД: 
Post (title - varchar 255, description - text) & Comment(name - varchar, text - text, post_id - int)
У каждого поста может быть несколько комментариев
Вам нужно будет создать компоненты создания, отображение постов, отображение отдельного поста с комментариями
Для Вас уже будут заготовлены все методы API и созданы контроллеры ( Вам только отправить туда с формы нужно будет данные и отобразить)
Все компоненты будут созданы и маршруты прописаны - обязательно изучите структуру, так как ее нужно будет объяснить почему у нас так
Для запросов через аксиос смотрите в routes/api.php - если забыли маршруты
Бэкенд настроен для Вас - с Вас только vue
```
### Ваши задачи
1. Отображение всех постов с пагинацией (`/resources/js/views/posts/Posts.vue`) и возможностью открыть отдельный пост 
    1. Для получения данных используйте `Axios` методом post по адресу `/api/posts`
2. Создать компонент создания поста CreatePost.vue - сохраните в `/resources/js/components`
   1. Создайте в нем форму (title, description)
   2. Через `Axios` методом post отправить эти данные на адрес `/api/*/create` ( * - post или comment) - остальное сделает обработчик и сохранит пост
   3. Встройте этот компонент в страницу посты и сделайте через прослушиватель vue обновление списка постов
3. Доработать компонент отображения поста
   1. Комментарии можно оформить в виде карточек с простой пагинацей
   2. Добавить возможность создавать комментарии CreateComment.vue (также сохраните в компоненты аналогично п.2 и используйте на странице c отдельным постом)
4. В формы встроить vuelidate или использовать ответ валидации laravel в axios.catch (поймать сообщение с ошибками и красиво отобразить)
5. Не обязательно, но приветствуется - редактирование поста
   1. Данные отправлять на `/api/post` параметры (вместе с id)

## Важно:
* Vue компоненты (components - для переиспользования) и представления страниц spa (views) располагаются в `/resources/js`
* Там же router.js и app.js (подключать npm пакеты - для валидации)
* Уже созданы для SPA страница главная и посты, а также создан маршрут `/posts/:id/show` - для показа
## Примеры кода
### Ссылка для работы с роутерами с передачей параметра как props (по id внутри делать запрос к серверу через axios и передавать id)
```vue
<router-link
    :to="{ name: 'Post', params: { id: item.id }}">
  Открыть 
</router-link>                                            
```
