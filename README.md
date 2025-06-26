# ROPO - Registro de Oficios y Profesionales

## Descripción

ROPO es una plataforma web diseñada para conectar proveedores de servicios locales (electricistas, plomeros, albañiles, entrenadores personales, etc.) con clientes que buscan contratar estos servicios de manera segura y confiable. Además, ofrece oportunidades laborales a personas que necesitan su primera experiencia, formación profesional y recursos de bienestar.

## Objetivos del Proyecto

- Facilitar la búsqueda de profesionales calificados en la comunidad.
- Proporcionar un sistema de reputación con valoraciones y comentarios.
- Ofrecer cursos y talleres para el desarrollo de habilidades.
- Incluir sección de bienestar con información sobre gimnasios y entrenadores locales.

## Características Principales

- **Sistema de Autenticación**: Registro y login para proveedores y clientes.
- **Reputación**: Puntuaciones y comentarios de usuarios.
- **Chat Privado**: Comunicación directa entre cliente y proveedor.
- **CRUD de Ofertas**: Crear, editar y eliminar publicaciones de servicios.
- **Gestión de Usuarios**: Listado y edición de perfil de usuario.
- **Formación**: Sección de cursos y talleres.
- **Bienestar**: Información y enlaces a servicios de salud y fitness.

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (módulos ES6).
- **Backend**: Node.js (servidor estático), **NestJS** (API REST en futuro desarrollo).
- **Base de datos**: JSON local (registro en archivo), **MySQL** (planificado).
- **Control de versiones**: Git (ramos específicos de desarrollo).

## Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/alejo-RS-12/trabajo_final.git
   cd ropo
   ```
2. Instalar extensiones (opcional) o usar servidor local simple:
   ```bash
   npm install -g serve
   serve .
   ```
3. Abrir en el navegador:
   ```
   http://localhost:5000/index.html
   ```

## Uso

1. Abrir `index.html` en el navegador.
2. Hacer clic en "Aquí" para registrarse o iniciar sesión.
3. Navegar por el menú para explorar:
   - Formación
   - Trabajos
   - Bienestar
   - Nosotros
4. Crear y gestionar publicaciones de servicios.

## Documentación

- **Figma**: [Enlace a maquetado de la plataforma](https://www.figma.com/design/8ABYfvCq0p4Zyw9prNndiN/trabajo?node-id=0-1&t=0FpE8PwlF8lKefqn-1)
- **Trello**: [Tablero de planificación](https://trello.com/b/hgcTTecx/trabajofinal)
- **Presentación**: [Diapositivas en Google Slides](https://docs.google.com/…)
- **Carpeta Google Drive**: [Con documentación del Proyecto R.O.P.O.](https://drive.google.com/drive/folders/1JsLN51iMlkmZFnb_SvqPBmwPHW-zIUpk)

## Requisitos de Aprobación

- Equipos conformado por 4 personas
- Aplicación navegable con al menos 4 pantallas.
- Implementación de buenas prácticas de Git: ramas por funcionalidad.
- Sistema de autenticación funcional.
- Diseño de las pantallas de home, login y crud para publicaciones.
- Validaciones.
- Board en trello con las user stories, épicas de diseño y frontend, sprints.
- Documento el google drive con las especificaciones del proyecto
- El readme del proyecto con link a la carpeta del drive con toda la documentación (docs, diagramas, etc)

## Licencia

Este proyecto es de uso educativo y no comercial. Puedes modificar y redistribuir bajo la licencia MIT.

---

© 2025 ROPO - Registro de Oficios y Profesionales - Todos los derechos reservados
