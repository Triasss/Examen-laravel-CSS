<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DAW</title>
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
        }
        header {
            background: #111;
            color: white;
        }
    </style>
</head>
<body>

<header>
    <h1>GESTOR DELS MEUS PROJECTES</h1>
</header>

<main>
    <div class="layout">

        <aside class="sidebar">
            <h2>Llistat del meus projectes</h2>

            <div id="project-list">
            </div>
        </aside>

        <article class="featured" id="featured">
        </article>

        <section class="news" id="task-list">
            <article class="card">
            </article>
        </section>

    </div>
</main>

<footer>
    <p>Examen DAW - Layout Responsive sense media queries</p>
</footer>

<script src="{{ asset('js/dashboard.js') }}"></script>

</body>
</html>