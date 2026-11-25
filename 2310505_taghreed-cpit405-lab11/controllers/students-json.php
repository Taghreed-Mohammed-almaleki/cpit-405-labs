<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: Ajax (DOM, XML, JSON, PHP)
*/

require_once __DIR__ . '/../models/students.php';

header('Content-Type: application/json; charset=UTF-8');

$students = getStudents();

echo json_encode($students, JSON_PRETTY_PRINT);
