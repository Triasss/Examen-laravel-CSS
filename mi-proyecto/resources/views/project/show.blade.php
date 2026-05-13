<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Detalle del Proyecto</title>
</head>
<body>

<h1>Detalle del Proyecto</h1>

<a href="{{ route('project.index') }}">Volver al listado</a>

<br><br>

<p><strong>ID:</strong> <span id="p-id"></span></p>
<p><strong>Nombre:</strong> <span id="p-nombre"></span></p>
<p><strong>Descripción:</strong> <span id="p-descripcion"></span></p>
<p><strong>Usuario ID:</strong> <span id="p-users_id"></span></p>
<p><strong>Fecha inicio:</strong> <span id="p-fecha_inicio"></span></p>
<p><strong>Fecha fin:</strong> <span id="p-fecha_fin"></span></p>

<a id="edit-link" href="#">Editar este proyecto</a>

<script>
    const PROJECT_ID = {{ $id }};
</script>
<script src="{{ asset('js/project/show.js') }}"></script>

</body>
</html>
