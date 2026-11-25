<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

function power($base, $exponent)
{
    $result = 1;

    for ($i = 0; $i < $exponent; $i++) {
        $result *= $base;
    }

    return $result;
}

$base = 2;
$exponent = 5;
$result = power($base, $exponent);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 10 - Power Function</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>

    <h1>Power Function</h1>

    <p>
        <?php
        echo $base . " raised to the power of " .
             $exponent . " = " . $result;
        ?>
    </p>

    <script src="../js/script.js"></script>
</body>
</html>
