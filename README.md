Para ejecutar el proyecto son necesarios los siguientes comando:

composer install
nmp install
php artisan passport:keys
php artisan passport:client
php artisan migrate

Por último para crear en la base de datos las etiquetas para la creación de las notas debido a aue no existe un CRUD para ellas, entonces ejecutamos:

php artisan db:seed --class=LabelSeeder
