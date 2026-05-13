<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Editar Proyecto</title>
</head>
<body>

<h1>Editar Proyecto</h1>

<a href="{{ route('project.index') }}">Volver al listado</a>

<br><br>

<label>Nombre: <input type="text" id="nombre"></label><br>
<label>Descripción: <textarea id="descripcion"></textarea></label><br>
<label>Usuario ID: <input type="number" id="users_id"></label><br>
<label>Fecha inicio: <input type="date" id="fecha_inicio"></label><br>
<label>Fecha fin: <input type="date" id="fecha_fin"></label><br>

<button onclick="updateProject()">Guardar cambios</button>

<pre id="result"></pre>

<script>
    const PROJECT_ID = {{ $id }};
</script>
<script src="{{ asset('js/project/edit.js') }}"></script>

</body>
</html>
