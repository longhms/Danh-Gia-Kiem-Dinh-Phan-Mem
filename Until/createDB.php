<?php
$servername = "localhost"; // Hoặc IP của máy chủ MySQL
$username = "root"; // Tên người dùng MySQL
$password = ""; // Mật khẩu MySQL

// Tạo kết nối tới MySQL
$conn = new mysqli($servername, $username, $password);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối tới MySQL thất bại: " . $conn->connect_error);
}

// Tạo database qlnv
$sql_create_db = "CREATE DATABASE IF NOT EXISTS dbQuanLyThue";
$conn->query($sql_create_db);
// Chọn database qlnv
$conn->select_db("dbQuanLyThue");

// Tạo bảng users
$sql_create_table = "CREATE TABLE IF NOT EXISTS `tblUsers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `realName` VARCHAR(255) NOT NULL,
    `income` INT,
    `snpt` INT,
)";
$conn->query($sql_create_table);


// Chèn một user vào bảng users
$username = "username";
$password = "password";

$sql_insert_user = "INSERT INTO `tblUsers` (`username`, `password`) VALUES ('$username', '$password')";
if ($conn->query($sql_insert_user) === TRUE) {
    echo "User đã được chèn vào bảng users.<br>";
} else {
    echo "Lỗi khi chèn user: " . $conn->error . "<br>";
}

// Đóng kết nối
$conn->close();
?>