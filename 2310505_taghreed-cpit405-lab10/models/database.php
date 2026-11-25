<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

function getConnection(?string $database = null): mysqli
{
    $host = "localhost";
    $username = "root";
    $password = "";
    $port = 3306;

    $connection = new mysqli(
        $host,
        $username,
        $password,
        $database ?? "",
        $port
    );

    if ($connection->connect_error) {
        die(
            "Database connection failed: " .
            $connection->connect_error
        );
    }

    return $connection;
}

function getDatabaseNames(): array
{
    $connection = getConnection();

    $result = $connection->query(
        "SHOW DATABASES;"
    );

    $databases = [];

    if ($result) {
        while ($row = $result->fetch_row()) {
            $databases[] = $row[0];
        }
    }

    $connection->close();

    return $databases;
}
?>
