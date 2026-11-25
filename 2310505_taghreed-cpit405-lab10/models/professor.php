<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

require_once __DIR__ . '/database.php';

function getAllProfessors(): array
{
    $connection = getConnection("cpit405_lab10");

    $result = $connection->query(
        "SELECT id, name, salary FROM professors ORDER BY id;"
    );

    $professors = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $professors[] = $row;
        }
    }

    $connection->close();

    return $professors;
}

function addProfessor(string $name, float $salary): bool
{
    $connection = getConnection("cpit405_lab10");

    $statement = $connection->prepare(
        "INSERT INTO professors (name, salary) VALUES (?, ?)"
    );

    $statement->bind_param(
        "sd",
        $name,
        $salary
    );

    $success = $statement->execute();

    $statement->close();
    $connection->close();

    return $success;
}

function updateProfessor(
    int $id,
    string $name,
    float $salary
): bool
{
    $connection = getConnection("cpit405_lab10");

    $statement = $connection->prepare(
        "UPDATE professors
         SET name = ?, salary = ?
         WHERE id = ?"
    );

    $statement->bind_param(
        "sdi",
        $name,
        $salary,
        $id
    );

    $success = $statement->execute();

    $statement->close();
    $connection->close();

    return $success;
}

function deleteProfessor(int $id): bool
{
    $connection = getConnection("cpit405_lab10");

    $statement = $connection->prepare(
        "DELETE FROM professors WHERE id = ?"
    );

    $statement->bind_param(
        "i",
        $id
    );

    $success = $statement->execute();

    $statement->close();
    $connection->close();

    return $success;
}
?>
