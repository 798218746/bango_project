<?php
	//链接数据库
	include 'connect.php';
	
	$imgurl = isset($_GET['imgurl']) ? $_GET['imgurl'] : '';
	
	// SQL语句
	$sql = "select * from goodslist";
	
	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	echo json_encode($rows,JSON_UNESCAPED_UNICODE);
	
	//关闭连接
	$conn->close();
?>

