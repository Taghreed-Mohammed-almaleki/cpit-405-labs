<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

require_once __DIR__ . '/../models/professor.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = trim($_POST["name"] ?? "");
    $salary = $_POST["salary"] ?? "";

    if ($name === "" || $salary === "") {
        header(
            "Location: ../views/professors.php?status=missing"
        );
        exit;
    }

    $salary = (float) $salary;

    $success = addProfessor(
        $name,
        $salary
    );

    if ($success) {
        header(
            "Location: ../views/professors.php?status=added"
        );
        exit;
    }

    header(
        "Location: ../views/professors.php?status=error"
    );
    exit;
}

header(
    "Location: ../views/professors.php"
);
exit;
?>
