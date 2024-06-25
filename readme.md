# PROYECTO DE APLICACIÓN DE SALUD-ULP INTEGRADOR 2024

## Tecnologías Utilizadas:
- Node.js
- Express.js
- MySQL
- JQuery
- Bootstrap
- Sequelize

## Cosas a tener en cuenta:
- Carga de Medicamentos (Nombres, Forma, Concentración, Familia y Categoría), Roles, Estudios (Prestación), Especialidades, Profesiones por default una vez inicia la aplicación usando el método `findOrCreate` de Sequelize.
- Posibilidad de añadir más Medicamentos y Estudios (Prestación) en caso de así necesitarlo.
- En la parte superior izquierda se ha otorgado un nombre de médico inventado con fines prácticos.
- En las recetas se mostrará el nombre del médico con ID 1 (uno), en caso de no poseerlo, crearlo o modificarlo desde la BD. (Esto se arreglará con la implementación de la validación de usuarios).

## Camino Básico sugerido:
- La app raíz inicia en el Login (NO funcional), utilizar el botón "Registrar" para crear un Usuario con Rol de Profesional.
- Una vez registrado debería mostrar la vista de Pacientes (en caso de no hacerlo, acceder al endpoint `/paciente`).
- A partir de ese punto deberían estar todas las funcionalidades pedidas trabajando correctamente.
