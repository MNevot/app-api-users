 # Funcionamiento de la aplicacion
 

  ![](https://github.com/MNevot/app-api-users/blob/master/funcionamiento.gif)

# Tiempo aproximado dedicado

  Alrededor de 10 horas de trabajo distribuidas en 3 dias.

# Desarrollo de la App

He planteado la app con la siguiente estructura:

La estructura de la app son los componentes propios del crud de usuarios que efectúan peticiones a la API. Estas peticiones están gestionadas por sus correspondientes servicios. La autorización del usuario se realiza gracias a un interceptor que recoge él toquen del localstorage(del login) y lo devuelve en la cabecera con el uso de cualquier petición. Para cerrar sesión, solo es necesario clicar el botón "logout" que se encarga de limpiar los datos del usuario y por consiguiente, limitando las funciones que se pueden usar al no constar de autorización en la API (EJ: acceder al listado).

En el desarrollo de este planteamiento he encontrado varias complicaciones y errores por el camino.

Muchos de ellos eran errores simples que no me costaron mucho encontrar su causa y su solución (tipado, variables, parámetros necesarios, rutas, importaciones en el AppModules...)

Para las necesidades en algún apartado del ejercicio he utilizado repositorios npm como se muestran en el package.json:

Con la gestión de los datos del cliente he recurrido al uso del "ngx-webstorage"

https://www.npmjs.com/package/ngx-webstorage

He empleado el repositorio de "ngx-toastr" para la creación de unas sencillas notificaciones a la hora de registrarse y logearse.

https://www.npmjs.com/package/ngx-toastr

Para la implementación de los iconos de las acciones del listado he utilizado la librería "font-awesome" con diferentes iconos.

https://www.npmjs.com/package/font-awesome

Con los estilos he utilizado boostrap.
https://www.npmjs.com/package/bootstrap

Al realizar pruebas he tenido problemas con alguna incompatibilidad de estos paquetes, por ello he instalado las últimas versiones con más descargas.

A la hora de mostrar usuarios no comparaba los ids y como resultado me mostraba todos los datos de todos los usuarios, no el usuario del botón correspondiente.

Con las acciones del listado de borrar y editar conseguía hacer los cambios en la API, pero no se mostraban en tiempo real(era necesario recargar la pagina), pareciendo que no se habían realizado los cambios. Por ello ahora, actualizo el listado que utiliza el template después de la petición.
 
Con el borrado me parecía necesario una confirmación y cree un pequeño alert de confirmación.

Para la creación de un formulario usé una propiedad de angular  "@angular/forms" que te facilita su gestión, te permite validar los campos y limpiar después del submit.

Al principio para acceder a la información necesaria para listar los usuarios tuve problemas. Ahora accedo al array de items usuario y gestiono estos datos implementadle una clase de usuario con los campos correspondientes.

