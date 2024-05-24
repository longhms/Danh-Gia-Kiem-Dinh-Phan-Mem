<?php
function generate_random_id($length = 10) {
    return bin2hex(random_bytes($length / 2));
}

function register_user($username, $realName, $password) {
    $servername = "localhost"; 
    $db_username = "root"; 
    $db_password = ""; 
    $dbname = "dbQuanLyThue"; 

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
        echo "<b>Username đã tồn tại. Vui lòng chọn tên khác.</b>";
        echo '<a href="login.html">Quay lại</a>';
    } else {
        // Chèn user mới vào bảng tblUsers
        $sql_insert_user = "INSERT INTO `tblUsers` (`id`, `username`, `realName`, `password`,`income`,`snpt`) VALUES ('$user_id', '$username', '$realName', '$password','$user_IC','$user_SNPT')";
        if ($conn->query($sql_insert_user) === TRUE) {
            echo "Đăng ký thành công. Vui lòng <a href='login.html'>đăng nhập</a>.";
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
?>
