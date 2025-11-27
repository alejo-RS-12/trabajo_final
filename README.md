# ROPO - Registro de Oficios y Profesionales

## Descripción

ROPO es una plataforma web diseñada para conectar proveedores de servicios locales (electricistas, plomeros, albañiles, entrenadores personales, etc.) con clientes que buscan contratar estos servicios de manera segura y confiable. Además, ofrece oportunidades laborales a personas que necesitan su primera experiencia, formación profesional y recursos de bienestar.

## Objetivos del Proyecto

* Facilitar la búsqueda de profesionales calificados en la comunidad.
* Brindar un sistema de reputación basado en puntajes y comentarios.
* Ofrecer cursos y talleres para el desarrollo de habilidades.
* Permitir la comunicación directa entre usuario y proveedor.
* Incluir sección de bienestar con información sobre gimnasios y entrenadores y salud.

## Características Principales

* **Sistema de autenticación (JWT)**: registro/login para proveedores, clientes y admin.
* **Reputación**: Puntuaciones y comentarios de usuarios.
* **Chat Privado**: Comunicación directa entre cliente y proveedor.
* **CRUD de Ofertas**: Crear, editar y eliminar publicaciones de servicios.
* **Gestión de Usuarios**: Listado y edición de perfil de usuario.
* **Formación**: Sección de cursos y talleres.
* **Bienestar**: Información y enlaces a servicios de salud y fitness.
* **Panel Admin**: administración de usuarios, denuncias y publicaciones.

## Tecnologías Utilizadas

* **Frontend**: HTML5, CSS3, JavaScript, React.JS(vite), Hooks, Context Api.
* **Backend**: Nest.JS, TypeORM, JWT, Bcrypt, Nodemailer.
* **Base de datos**: MySQL, Scripts de creación de base + migración automática con synchronize, Seeds automáticos  mediante script ts-node
* **Control de versiones**: Git (ramas específicos de desarrollo). Postman para pruebas, 

## Instalación y Ejecución

1_ Una vez clonado o descargado el proyecto, utilizando la terminal de visual estudio code se tiene que instalar las dependencias en cada carpeta:
En la raiz del poryecto (npm install), luego en la carptea de frontend y back-end lo mismo

2- crear la base de datos en MySQL Wokrbench 
CREATE DATABASE IF NOT EXISTS ropo2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ropo2;

3_ En la carpeta back-end ir al archivo app.module.ts y cambiar lo siguiente, hacer lo mismo en seeds/seed,module.ts
   username: process.env.DB_USER || '***', nombre de tu perfil en la base de datos
   password: process.env.DB_PASS || '***'contraseña de tu base de datos
   hacer lo mismo en seeds/seed,module.ts
   luego en el mismo archivo app.module cambiar synchronize: false, por true

   una vez hecho eso en la consola hacer cd back-end npm run start:dev (esto general las tablas vacias en la base de datos); una vez hecho esto volver a cambiar synchronize: true, por false y volver a poner cd back-end npm run start:dev.

4_ Ejecutar seeds:
    en la terminal hacer cd back-end ts-node src/seeds/main.ts.
    Esto Carga roles, usuarios iniciales, profesiones, etc.

5_ En otra terminal ejecutar el frontend
   cd frontend.
   npm run dev.
   Luego podes entrar con el link que te aparece que seria http://localhost:5173/.



## Uso

1. Registrarse o iniciar sesión.
2. Explorar el menú:
   - Formación
   - Trabajos
   - Bienestar
   - Nosotros
3. Crear y gestionar publicaciones de servicios.
4. Interactuar con proveedores o clientes según el rol

## Documentación

* **Figma**: [Enlace a maquetado de la plataforma](https://www.figma.com/design/8ABYfvCq0p4Zyw9prNndiN/trabajo?node-id=0-1&t=0FpE8PwlF8lKefqn-1)
* **Trello**: [Tablero de planificación](https://trello.com/b/hgcTTecx/trabajofinal)
* **Presentación**: [Diapositivas en Google Slides](https://docs.google.com/…)
* **Carpeta Google Drive**: [Con documentación del Proyecto R.O.P.O.](https://drive.google.com/drive/folders/1JsLN51iMlkmZFnb_SvqPBmwPHW-zIUpk)

## Requisitos de Aprobación

* Equipos conformado por 4 personas
* Aplicación navegable con al menos 4 pantallas.
* Implementación de buenas prácticas de Git: ramas por funcionalidad.
* Sistema de autenticación funcional.
* Diseño de las pantallas de home, login y crud para publicaciones.
* Validaciones.
* Board en trello con las user stories, épicas de diseño y frontend, sprints.
* Documento el google drive con las especificaciones del proyecto
* El readme del proyecto con link a la carpeta del drive con toda la documentación (docs, diagramas, etc)

## Licencia

Este proyecto es de uso educativo y no comercial. Puedes modificar y redistribuir bajo la licencia MIT.

---

© 2025 ROPO - Registro de Oficios y Profesionales - Todos los derechos reservados