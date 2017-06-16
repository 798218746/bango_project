<?php
	// 引入其他php文件
	include 'connect.php';

	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$telephone = isset($_GET['telephone']) ? $_GET['telephone'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';
	$password = md5($password);
	$sql = "select * from user";

	// 获取查询结果
	$res = $conn->query($sql);
	//查询结果集（至关重要）
	$row = $res->fetch_all(MYSQLI_ASSOC);
		$arr = "insert into user(username,telephone,password) values('$username','$telephone','$password')";
		$arrs = $conn->query($arr);
		if($row){
			echo 1;
		}else{
			echo "Error: " . $sql . "<br/>" . $conn->error;
		}

	//关闭连接
	$conn->close();

?>