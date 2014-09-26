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

Check if the deployed keys match.

Deploy the dist and server folder into your php server.

Change the hardcoded ip address of production machine in:
```
app/scripts/controllers/main.js
```

Modify the list of nmap servers:
```
server/scripts/shell/getHostsStatus.sh
```
