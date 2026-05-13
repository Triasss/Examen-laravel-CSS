<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Crear Proyecto</title>
</head>
<body>

<h1>Crear Proyecto</h1>

<a href="{{ route('project.index') }}">Volver al listado</a>

<br><br>

<label>Nombre: <input type="text" id="nombre"></label><br>
<label>Descripción: <textarea id="descripcion"></textarea></label><br>
<label>Usuario ID: <input type="number" id="users_id"></label><br>
<label>Fecha inicio: <input type="date" id="fecha_inicio"></label><br>
<label>Fecha fin: <input type="date" id="fecha_fin"></label><br>

<button onclick="storeProject()">Crear</button>

<pre id="result"></pre>

<script src="{{ asset('js/project/create.js') }}"></script>

</body>
</html>
