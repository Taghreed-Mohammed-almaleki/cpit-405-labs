/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: Ajax (DOM, XML, JSON, PHP)
*/

function loadStudents() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "../controllers/students-json.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const students = JSON.parse(xhr.responseText);
            console.log(students);
            console.table(students);
        } else {
            console.error("Request failed.");
        }
    };

    xhr.onerror = function () {
        console.error("Network error.");
    };

    xhr.send();
}
