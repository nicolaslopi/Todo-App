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
