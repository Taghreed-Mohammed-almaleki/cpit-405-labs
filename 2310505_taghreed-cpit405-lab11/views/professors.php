<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: AJAX
*/
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 11 - Professors AJAX</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>

    <h1>Professors Management</h1>

    <p>Retrieve professors from MariaDB using AJAX.</p>

    <button type="button" onclick="loadProfessors()">
        Load Professors
    </button>

    <p id="status"></p>

    <table border="1" cellpadding="10">

        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
            </tr>
        </thead>

        <tbody id="professors-body">
        </tbody>

    </table>

    <script src="../js/professors.js"></script>

</body>

</html>
