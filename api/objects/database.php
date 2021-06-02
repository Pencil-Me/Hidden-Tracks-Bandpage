<?php
include_once '../config/databaseconfig.php';

// used to get mysql database connection
class Database {
    // specify your own database credentials
    private $host = DBConfig::host;
    private $database_name = DBConfig::database_name;
    private $username = DBConfig::username;
    private $password = DBConfig::password;

    public $conn;

    public function getConnection(){
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }
        catch(PDOException $exception){
            echo "Database could not be connected: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
