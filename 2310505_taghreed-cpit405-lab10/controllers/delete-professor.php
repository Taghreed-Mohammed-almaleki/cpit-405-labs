<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

require_once __DIR__ . '/../models/professor.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id = (int) ($_POST["id"] ?? 0);

    if ($id <= 0) {
        header(
            "Location: ../views/professors.php?status=invalid"
        );
        exit;
    }

    $success = deleteProfessor($id);

    if ($success) {
        header(
            "Location: ../views/professors.php?status=deleted"
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
