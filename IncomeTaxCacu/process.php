<?php
session_start(); // Bắt đầu phiên
function authenticate_user($username, $income, $dependents) {
    $servername = "localhost"; // Hoặc IP của máy chủ MySQL
    $db_username = "root"; // Tên người dùng MySQL
    $db_password = ""; // Mật khẩu MySQL
    $dbname = "dbQuanLyThue"; // Tên cơ sở dữ liệu

    // Tạo kết nối tới MySQL
    $conn = new mysqli($servername, $db_username, $db_password, $dbname);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Kết nối tới MySQL thất bại: " . $conn->connect_error);
    }

    // Chuyển các ký tự đặc biệt thành các ký tự an toàn trong SQL
    $username = $conn->real_escape_string($username);
    $income = $conn->real_escape_string($income);
    $dependents = $conn->real_escape_string($dependents);

  
    $sql = "UPDATE `tblUsers` SET `income` = '$income', `snpt` = '$dependents' WHERE `username` = '$username'";
    if ($conn->query($sql) === TRUE) {
        echo 'Lưu thông tin thành công';
    } else {
        echo 'Lưu thông tin thất bại: ' . $conn->error;
    }

    // Đóng kết nối
    $conn->close();
}

$username = $_SESSION['username'];
$income = $_POST['income'];
$dependents = $_POST['dependents'];
authenticate_user($username,$income,$dependents);
?>
