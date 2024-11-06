## Recomendaciones para la carpeta de backend_inicial

* Para la creación del archivo package.json, abriendo una terminal en la ruta de la carpeta
  de backend_inicial digitamos el comando:
  ```
  nmp init -y
  ```
* Luego ingresar al archivo package.json para reemplazar en la parte del script:

    "test": "echo \"Error: no test specified\" && 1"
   reemplazarlo por: 
    "start": "node index.js"

* Procedemos a crear el archivo index.js para ser usado en el backend.

* Para agregar las dependencias que serán utilizadas en el archivo del index.js; en este
  caso la dependencia "express" es requerida, digitamos el comando siguiente dentro de la
  ruta de la carpeta del backend_inicial:
  ```
  nmp i express
  ```

* Después de ejecutar el comando citado, proceder a eliminar el directorio de "node_modules"
  ya que este directorio será creado en el servicio del contenedor cuando se crea la imagen.
  