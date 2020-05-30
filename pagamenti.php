<?php
  header('Content-Type: application/json');

  $server = 'localhost';
  $username = 'root';
  $password = 'root';
  $dbName = 'db-hotel';
  $conn = new mysqli($server, $username, $password, $dbName);
  if ($conn -> connect_errno) {
    echo json_encode ($conn -> connect_errno);
    return;
  }
  $sql = "
    SELECT id, status, price
    FROM pagamenti
  ";
  $results = $conn -> query($sql);

  $res = [];
  if ($results -> num_rows > 0){
    while ($row = $results -> fetch_assoc()) {
      $res[] = $row;
    }
    echo json_encode($res);
  } else{
    echo json_encode("Nessun risultato");
  }
  $conn -> close();
?>
