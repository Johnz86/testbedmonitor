<?php

require_once ("scripts/php/statusResponse.php");
header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');

if (isset($_GET['all-profiles'])) {
	$json = getAllActiveProfiles();
}

if (isset($_GET['profiles'])) {
	$json = getActiveProfiles($_GET['profiles']);
}

if (isset($_GET['hosts'])) {
	$json = getHostsStatus();
}

if (isset($_GET['disk'])) {
	$json = getDiskInfo();
}

if (isset($_GET['host'])) {
        //$json = getVMs($_GET['host']);
	$json = getHostsVM($_GET['host']);
}


#ON if no callback
if( ! isset($_GET['callback']))
    exit($json);

# JSONP if valid callback
if(isset($_GET['callback']))
    exit("{$_GET['callback']}($json)");

# Otherwise, bad request
header('status: 400 Bad Request', true, 400);

?>
