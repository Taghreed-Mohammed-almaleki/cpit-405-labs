/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 11: AJAX
*/

function loadProfessors() {
    const xhr = new XMLHttpRequest();

    const status = document.getElementById("status");
    const tableBody = document.getElementById("professors-body");

    status.textContent = "Loading professors...";

    xhr.open("GET", "../controllers/professors-json.php", true);

    xhr.onload = function () {
        try {
            if (xhr.status !== 200) {
                throw new Error("Request failed.");
            }

            const response = JSON.parse(xhr.responseText);

            if (!response.success) {
                throw new Error(response.message);
            }

            tableBody.textContent = "";

            response.data.forEach(function (professor) {
                const row = document.createElement("tr");

                ["id", "name", "salary"].forEach(function (key) {
                    const cell = document.createElement("td");
                    cell.textContent = professor[key];
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });

            status.textContent = "Professors loaded successfully.";

        } catch (error) {
            status.textContent = "Failed to load professors.";
            console.error(error);
        }
    };

    xhr.onerror = function () {
        status.textContent = "Network error. Request failed.";
    };

    xhr.send();
}
