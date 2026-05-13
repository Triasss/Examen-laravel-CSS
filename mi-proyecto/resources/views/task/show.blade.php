<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Detalle de Tarea</title>
</head>
<body>

<h1>Detalle de Tarea</h1>

<a href="{{ route('task.index') }}">Volver al listado</a>

<br><br>

<p><strong>ID:</strong> <span id="t-id"></span></p>
<p><strong>Descripción:</strong> <span id="t-description"></span></p>
<p><strong>Completada:</strong> <span id="t-completada"></span></p>
<p><strong>Proyecto ID:</strong> <span id="t-projects_id"></span></p>


<script>
    const TASK_ID = {{ $id }};
</script>
<script src="{{ asset('js/task/show.js') }}"></script>

</body>
</html>
