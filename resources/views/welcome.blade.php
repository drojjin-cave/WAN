<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WAN</title>

    @if(app()->environment('local'))
        @viteReactRefresh
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/resources/js/app.js"></script>
    @else
        @vite(['resources/js/app.js'])
    @endif
</head>
<body class="antialiased">
<div id="root"></div>
</body>
</html>
