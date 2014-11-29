"use strict";angular.module("katinasRobotWebApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$httpProvider",function(a){a.defaults.useXDomain=!0}]).factory("RobotFactory",["$resource","$http",function(a,b){return b.defaults.useXDomain=!0,a("http://:ipAddress/:action",{action:"@action"},{connect:{method:"GET",params:{action:"Authenticate"}},move:{method:"GET",params:{action:"Move"}},startCapturing:{method:"GET",params:{action:"StartCapturing"}},stopCapturing:{method:"GET",params:{action:"StopCapturing"}},sendMessage:{method:"GET",params:{action:"DisplayMessage"}}})}]),angular.module("katinasRobotWebApp").controller("MainCtrl",["$scope","RobotFactory","$interval",function(a,b,c){a.robotData={isConnecting:!1,isConnected:!1,isConnectionFailed:!1,lastDirection:null,ipAddress:null,cameraImage:"",isRecording:!1,isStartingCamera:!1,isStoppingCamera:!1},a.connect=function(){a.robotData.ipAddress&&(a.robotData.isConnecting=!0,b.connect({ipAddress:a.robotData.ipAddress},function(){a.robotData.isConnecting=!1,a.robotData.isConnected=!0},function(){a.robotData.isConnecting=!1}))},a.move=function(c){a.robotData.lastDirection!==c&&b.move({ipAddress:a.robotData.ipAddress,direction:c},function(){a.robotData.lastDirection=c})},a.sendMessage=function(c){b.sendMessage({ipAddress:a.robotData.ipAddress,message:c})},a.startCamera=function(){a.robotData.isStartingCamera=!0,b.startCapturing({ipAddress:a.robotData.ipAddress},function(){a.robotData.isRecording=!0,a.robotData.isStartingCamera=!1})},a.stopCamera=function(){a.robotData.isStoppingCamera=!0,b.stopCapturing({ipAddress:a.robotData.ipAddress},function(){a.robotData.isRecording=!1,a.robotData.isStoppingCamera=!1})},c(function(){a.robotData.isConnected&&(a.robotData.cameraImage="http://"+a.robotData.ipAddress+"/GetPicture?time="+(new Date).getTime())},4e3)}]);