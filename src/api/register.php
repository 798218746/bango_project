<?php
	// 引入其他php文件
	include 'connect.php';

	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$telephone = isset($_GET['telephone']) ? $_GET['telephone'] : '';

	$sql = "insert into user(username,telephone) values('$username','$telephone')";

	// 获取查询结果
	$res = $conn->query($sql);
	$row = $res->mysql_fetch_row($sql);
	if($res){  
	    if($row=mysql_fetch_array($res)){  
	    	
	        echo 1;//用户已存在  
	    }else{//注册成功  
	        mysql_query("insert into `user` (`username`,`telephone`) values ('$username','$telephone')");  
	        echo 2;  
	    }  
	}else{  
	    echo 0;
	}  

	//关闭连接
	$conn->close();

?>