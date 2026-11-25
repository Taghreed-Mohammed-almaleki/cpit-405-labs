<?php
/*
Student Name: Taghreed Mohammed Almalki
Student ID: 2310505
Course: CPIT-405
Lab 10: PHP and MariaDB
*/

class Person
{
    protected string $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function speak(): void
    {
        echo "Hello, my name is " . $this->name;
    }

    public function getName(): string
    {
        return $this->name;
    }
}

class Professor extends Person
{
    private float $salary;

    public function __construct(string $name, float $salary)
    {
        parent::__construct($name);
        $this->salary = $salary;
    }

    public function teach(): void
    {
        echo $this->name . " is teaching.";
    }

    public function getSalary(): float
    {
        return $this->salary;
    }
}

$professor = new Professor("Dr. Ahmed", 15000);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 10 - OOP Diagram</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>

    <h1>Person and Professor</h1>

    <p>
        Name:
        <?php echo $professor->getName(); ?>
    </p>

    <p>
        <?php $professor->speak(); ?>
    </p>

    <p>
        <?php $professor->teach(); ?>
    </p>

    <p>
        Salary:
        <?php echo $professor->getSalary(); ?>
    </p>

    <script src="../js/script.js"></script>
</body>

</html>
