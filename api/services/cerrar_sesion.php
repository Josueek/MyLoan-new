<?php
session_start();
session_destroy();
header("Location: ../../vistas/index.html");
exit();
?>
