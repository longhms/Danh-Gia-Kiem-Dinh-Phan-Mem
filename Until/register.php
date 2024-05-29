<?php
function generate_random_id($length = 10) {
    return bin2hex(random_bytes($length / 2));
}

function register_user($username, $realName, $password) {
    $servername = "localhost"; 
    $db_username = "root"; 
    $db_password = ""; 
    $dbname = "dbQuanLyThue"; 

    // Xác thực đầu vào
    if (!isValidUsername($username) || !isValidRealName($realName)) {
        header("Location: /loginn.html?errorSU2=1");
        exit();
    }
    if (!isValidPassword($password)) {
        header("Location: /loginn.html?errorSU3=1");
        exit();
    }

    // Tạo kết nối tới MySQL
    $conn = new mysqli($servername, $db_username, $db_password, $dbname);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Kết nối tới MySQL thất bại: " . $conn->connect_error);
    }

    // Chuyển các ký tự đặc biệt thành các ký tự an toàn trong SQL
    $username = $conn->real_escape_string($username);
    $realName = $conn->real_escape_string($realName);
    $password = $conn->real_escape_string($password);

    // Tạo ID ngẫu nhiên
    $user_id = generate_random_id();
    $user_IC = 0;
    $user_SNPT = 0;

    // Kiểm tra xem người dùng đã tồn tại hay chưa
    $sql_check_user = "SELECT * FROM `tblUsers` WHERE `username`='$username'";
    $result = $conn->query($sql_check_user);

    if ($result && $result->num_rows > 0) {
        header("Location: /loginn.html?errorSU=1"); // Chuyển hướng lại trang đăng nhập với tham số lỗi
        exit();
    } else {
        // Chèn user mới vào bảng tblUsers
        $sql_insert_user = "INSERT INTO `tblUsers` (`id`, `username`, `realName`, `password`, `income`, `snpt`) VALUES ('$user_id', '$username', '$realName', '$password', '$user_IC', '$user_SNPT')";
        if ($conn->query($sql_insert_user) === TRUE) {
            header("Location: /loginn.html?compSU=1"); // Chuyển hướng lại trang đăng nhập với thông báo thành công
            exit();
        } else {
            echo "Lỗi khi đăng ký: " . $conn->error . "<br>";
        }
    }

    // Đóng kết nối
    $conn->close();
}

// Sử dụng hàm register_user để đăng ký tài khoản mới
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username']; 
    $realName = $_POST['realName']; 
    $password = $_POST['password']; 
    register_user($username, $realName, $password);
}

function isValidUsername($username) {
    return preg_match('/^[a-zA-Z0-9]+$/', $username) && trim($username) === $username;
}

function isValidRealName($realName) {
    return preg_match('/^[a-zA-Z]+(\s[a-zA-Z]+)*$/', $realName) && trim($realName) === $realName;
}

function isValidPassword($password) {
    return strlen($password) >= 8 && !preg_match('/\s/', $password) && trim($password) === $password;
}
?>
