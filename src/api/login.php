<?php
	//链接数据库
	include 'connect.php';
	
	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';
	$yzm = 
	// SQL语句
	$sql = "select * from user where username = $username;

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	//关闭连接
	$conn->close();
?>
