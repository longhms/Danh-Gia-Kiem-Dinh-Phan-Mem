<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    
</body>
</html>
<?php
function authenticate_user($username, $password) {
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
    $password = $conn->real_escape_string($password);
    // echo $username;
    // echo $password;
    // Truy vấn kiểm tra tài khoản và mật khẩu
    $sql = "SELECT * FROM `tblUsers` WHERE `username`='$username' AND `password`='$password'";
    $result = $conn->query($sql);
    // while ($row = $result->fetch_assoc()) {
    //     print_r($row); // In ra mảng dữ liệu của hàng
    // }
    if ($result && $result->num_rows > 0) {
        echo "<p>Welcome, username!</p>";
        echo '<a href="/tester/Danh-Gia-Kiem-Dinh-Phan-Mem/IncomeTaxCacu/index.html"> check me </a>';
    } else {
        echo "<b>Username hoặc password sai. Vui lòng nhập lại.</b>";
        echo '<a href="loginn.html">Quay lại</a>';
    }

    // Đóng kết nối
    $conn->close();
}

// Sử dụng hàm authenticate_user để kiểm tra tài khoản và mật khẩu
$username = $_POST['username']; 
$password = $_POST['password']; 
authenticate_user($username, $password);
?>

