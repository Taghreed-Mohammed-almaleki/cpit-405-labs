<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: AJAX
*/

require_once __DIR__ . '/database.php';

function getAllProfessors(): array
{
    $connection = getConnection();

    $result = $connection->query(
        "SELECT id, name, salary FROM professors ORDER BY id"
    );

    $professors = [];

    while ($row = $result->fetch_assoc()) {
        $professors[] = $row;
    }

    $connection->close();

    return $professors;
}
