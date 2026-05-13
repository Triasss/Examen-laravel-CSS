<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Listado de Proyectos</title>
</head>
<body>

<h1>Proyectos</h1>

<a href="{{ route('project.create') }}">Crear proyecto</a>
<br><br>

<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Usuario ID</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="project-tbody">
        <tr><td colspan="7">Cargando...</td></tr>
    </tbody>
</table>
<br>
<a href="{{ route('dashboard.page') }}">Volver dashboard</a>

<script src="{{ asset('js/project/index.js') }}"></script>

</body>
</html>
