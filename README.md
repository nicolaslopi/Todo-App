Tecnologías:
Laravel 11, Vue3, motor de bases de datos MySQL, Vue-router, Vuex, axios y Laravel Passport para la autenticación mediante personal tokens.

Todo-App es una aplicación para la creación, edición, listado y eliminacion de notas.

Para ejecutar el proyecto son necesarios los siguientes comando:

composer install

npm install

php artisan passport:keys

php artisan passport:client

php artisan migrate

Para crear en la base de datos las etiquetas para la creación de las notas, debido a que no existe un CRUD para ellas, entonces ejecutamos:

php artisan db:seed --class=LabelSeeder

Por último, para levantar el servidor

php artisan serve
