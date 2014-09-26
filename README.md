testbedMonitor
==============

Monitoring tooling for xen virtual machines and attng testbed manager.

Based on [yeoman angular generator](https://github.com/yeoman/generator-angular)

To start clone the project.

The tool has hardcoded IP adresses so it can run localy and exchange the requests between the server and client.

To test webview and communication with server:
```
grunt serve
```

To build exeute:

```
grunt build
```
You should have /testbedmonitor/dist/ folder now.

Deploy the dist and server folder into your php server. In this way:
```
/testbedmonitor/dist/* > /srv/www/htdocs/testbedmonitor
```
```
/testbedmonitor/server/status_json.php > /srv/www/htdocs/testbedmonitor/status_json.php
```
```
/testbedmonitor/server/* > /srv/www/htdocs/testbedmonitor/scripts
```

Check if the deployed keys match.

Change the hardcoded ip address of production machine in:
```
app/scripts/controllers/main.js
```

Modify the list of nmap servers:
```
server/scripts/shell/getHostsStatus.sh
```
