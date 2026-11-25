<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

require_once __DIR__ . '/../models/professor.php';

$professors = getAllProfessors();

$status = $_GET["status"] ?? "";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Lab 10 - Professors</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>

    <h1>Professors</h1>

    <?php if ($status === "added"): ?>
        <p>Professor added successfully.</p>

    <?php elseif ($status === "updated"): ?>
        <p>Professor updated successfully.</p>

    <?php elseif ($status === "deleted"): ?>
        <p>Professor deleted successfully.</p>

    <?php elseif ($status === "missing"): ?>
        <p>Please enter all required fields.</p>

    <?php elseif ($status === "invalid"): ?>
        <p>Invalid data.</p>

    <?php elseif ($status === "error"): ?>
        <p>An error occurred.</p>
    <?php endif; ?>


    <h2>Add Professor</h2>

    <form
        action="../controllers/add-professor.php"
        method="POST"
    >

        <label for="name">
            Name:
        </label>

        <input
            type="text"
            id="name"
            name="name"
            required
        >

        <br><br>

        <label for="salary">
            Salary:
        </label>

        <input
            type="number"
            id="salary"
            name="salary"
            step="0.01"
            min="0"
            required
        >

        <br><br>

        <button type="submit">
            Add Professor
        </button>

    </form>


    <hr>


    <h2>Professor List</h2>

    <?php if (count($professors) > 0): ?>

        <table border="1" cellpadding="8">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>

                <?php foreach ($professors as $professor): ?>

                    <tr>

                        <td>
                            <?php echo htmlspecialchars($professor["id"]); ?>
                        </td>

                        <td>
                            <?php echo htmlspecialchars($professor["name"]); ?>
                        </td>

                        <td>
                            <?php echo htmlspecialchars($professor["salary"]); ?>
                        </td>

                        <td>

                            <form
                                action="../controllers/update-professor.php"
                                method="POST"
                            >

                                <input
                                    type="hidden"
                                    name="id"
                                    value="<?php echo htmlspecialchars($professor["id"]); ?>"
                                >

                                <input
                                    type="text"
                                    name="name"
                                    value="<?php echo htmlspecialchars($professor["name"]); ?>"
                                    required
                                >

                                <input
                                    type="number"
                                    name="salary"
                                    step="0.01"
                                    min="0"
                                    value="<?php echo htmlspecialchars($professor["salary"]); ?>"
                                    required
                                >

                                <button type="submit">
                                    Update
                                </button>

                            </form>

                        </td>

                        <td>

                            <form
                                action="../controllers/delete-professor.php"
                                method="POST"
                            >

                                <input
                                    type="hidden"
                                    name="id"
                                    value="<?php echo htmlspecialchars($professor["id"]); ?>"
                                >

                                <button type="submit">
                                    Delete
                                </button>

                            </form>

                        </td>

                    </tr>

                <?php endforeach; ?>

            </tbody>

        </table>

    <?php else: ?>

        <p>No professors found.</p>

    <?php endif; ?>

    <script src="../js/script.js"></script>
</body>

</html>
