## Recomendaciones para la carpeta de service_monitor

* Para la creación del archivo package.json, abriendo una terminal en la ruta de la carpeta
  de service_monitor digitamos el comando:
  ```
  nmp init -y
  ```
* Luego ingresar al archivo package.json para reemplazar en la parte del script:

    "test": "echo \"Error: no test specified\" && 1"
   reemplazarlo por: 
    "start": "node monitor.js"

* Procedemos a crear el archivo monitor.js para ser usado en el service_monitor

* Para agregar las dependencias que serán utilizadas en el archivo del monitor.js; en este
  caso las dependencias "redis; axios; socketio y dotenv" son requeridas, digitamos el comando siguiente dentro de la ruta de la carpeta del service_monitor:
  ```
  nmp i redis axios socketio dotenv cors
  ```

* Después de ejecutar el comando citado, proceder a eliminar el directorio de "node_modules"
  ya que este directorio será creado en el servicio del contenedor cuando se crea la imagen.

* Para que se pueda visualizar el mensaje del redis en el frontend que recibe del estado del
  backend se tuvo que realizar el cambio en el archivo package.json:
    "socketio": "^1.0.0" --> "socketio": "^4.6.0"
  Añadimos también la dependencia: 
    "cors":"2.8.5"