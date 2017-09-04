<?php
    error_reporting ( E_ALL );
    $msg = '';
    $msg += exec("git status 2>&1");
    $msg += exec("git reset --hard 2>&1");
    $msg += exec("git clean -f -d 2>&1");
    $msg += exec("git pull 2>&1");
    $msg += exec("chown -R www * 2>&1");
    $msg += exec("chown -R www:www .git 2>&1");
    $arr = array ('msg'=>$msg);
    echo json_encode($arr);
?>
