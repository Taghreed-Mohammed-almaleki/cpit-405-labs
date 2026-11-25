<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

require_once __DIR__ . '/../models/database.php';

$databases = getDatabaseNames();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 10 - Databases</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>

    <h1>Database Names</h1>

    <p>
        SQL Query:
        <strong>SHOW DATABASES;</strong>
    </p>

    <ul>
        <?php foreach ($databases as $database): ?>
            <li>
                <?php echo htmlspecialchars($database); ?>
            </li>
        <?php endforeach; ?>
    </ul>

    <script src="../js/script.js"></script>
</body>

</html>
