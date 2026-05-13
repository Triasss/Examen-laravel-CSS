<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Crear Tarea</title>
</head>
<body>

<h1>Crear Tarea</h1>

<a href="{{ route('task.index') }}">Volver al listado</a>

<br><br>

<label>Descripción: <textarea id="description"></textarea></label><br>
<label>Completada: <input type="checkbox" id="completada"></label><br>
<label>Proyecto ID: <input type="number" id="projects_id"></label><br>

<button onclick="storeTask()">Crear</button>

<pre id="result"></pre>

<script src="{{ asset('js/task/create.js') }}"></script>

</body>
</html>
