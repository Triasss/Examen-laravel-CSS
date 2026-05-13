<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Listado de Tareas</title>
</head>
<body>

<h1>Tareas</h1>

<a href="{{ route('task.create') }}">Crear tarea</a>

<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Completada</th>
            <th>Proyecto ID</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="task-tbody">
        <tr><td colspan="5">Cargando...</td></tr>
    </tbody>
</table>

<script src="{{ asset('js/task/index.js') }}"></script>

</body>
</html>
