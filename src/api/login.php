<?php
	//链接数据库
	include 'connect.php';
	
	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';
	// SQL语句
	$sql = "select * from user";
	
	// 获取查询结果
	$res = $conn->query($sql);
	if ($res->num_rows > 0) {
	    // 输出每行数据
	    echo 1;
	} else {
	    echo 0;
	}
	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	echo json_encode($rows,JSON_UNESCAPED_UNICODE);
	
	//关闭连接
	$conn->close();
?>
