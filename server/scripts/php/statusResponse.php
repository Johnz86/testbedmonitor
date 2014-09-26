<?php

function getVMs ($vmHostName) {
  $requestData = new stdClass;
  $requestData->action = "getVMs";
  $requestData->vmHostName = $vmHostName;
  return jsonAttRequest ($requestData); 
}

function getDiskInfo () {
  $responseData = shell_exec("scripts/shell/getDiskInfo.sh");
  return $responseData;
}

function getVMHosts () {
  $requestData = new stdClass;
  $requestData->action = "getVMHosts";
  return jsonAttRequest ($requestData);
}

function getActiveProfiles ( $testbed ) {
  $requestData = new stdClass;
  $requestData->action = "getActiveProfiles";
  $requestData->vmHostName = $testbed; 
  return jsonAttRequest ($requestData);
}

function getAllActiveProfiles () {
  $responseData= shell_exec("scripts/shell/getAllProfiles.sh");
  return $responseData;
}

function getHostsVM( $testbed ){
  $responseData = shell_exec("scripts/shell/getHostVMjson.sh ".$testbed);
  return $responseData;
}

function getHostsStatus(){
  $responseData = shell_exec("scripts/shell/getHostsStatus.sh");
  return $responseData;
}

function jsonAttRequest ( $requestData ) {
  $jsonRequestStr = json_encode($requestData);
  $jsonRequestBase64Str = base64_encode($jsonRequestStr);
  $jsonResponseBase64Str = shell_exec("scripts/shell/jsonAttInterface.sh ".$jsonRequestBase64Str );
  return base64_decode($jsonResponseBase64Str);
}

?>
