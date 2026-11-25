<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: AJAX
*/

function getConnection(): mysqli
{
    $connection = new mysqli(
        "localhost",
        "root",
        "",
        "cpit405_lab10",
        3306
    );

    $connection->set_charset("utf8mb4");

    return $connection;
}
