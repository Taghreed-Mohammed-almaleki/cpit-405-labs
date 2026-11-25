<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: AJAX
*/

require_once __DIR__ . '/../models/professor.php';

header('Content-Type: application/json; charset=UTF-8');

try {
    $professors = getAllProfessors();

    echo json_encode([
        "success" => true,
        "data" => $professors
    ], JSON_THROW_ON_ERROR);

} catch (Throwable $error) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Failed to retrieve professors."
    ]);
}
