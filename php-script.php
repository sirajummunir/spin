<?php

include('database.php');
$db=$conn;// database connection  

//legal input values
 $fullName     = $_POST['fullName'];
 $emailAddress = $_POST['emailAddress'];
 $mobileNumber = $_POST['mobileNumber'];
 $winPrize     = $_POST['winPrize'];
   
if(!empty($fullName) && !empty($emailAddress) && !empty($mobileNumber) && !empty($winPrize)){
    //  Sql Query to insert user data into database table
    Insert_data($fullName,$emailAddress,$mobileNumber,$winPrize);
}else{
 echo "All fields are required";
}
 
// convert illegal input value to ligal value formate
function legal_input($value) {
    $value = trim($value);
    $value = stripslashes($value);
    $value = htmlspecialchars($value);
    return $value;
}

// // function to insert user data into database table
 function insert_data($fullName,$emailAddress, $mobileNumber, $winPrize){
 
     global $db;

      $query="INSERT INTO prize(name,email,mobile,prize) VALUES('$fullName','$emailAddress','$mobileNumber','$winPrize')";

     $execute=mysqli_query($db,$query);
     if($execute==true)
     {
       echo "Thanks for participating";
     }
     else{
      echo  "Error: " . $sql . "<br>" . mysqli_error($db);
     }
 }

?>