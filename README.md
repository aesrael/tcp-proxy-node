# TCP-Proxy (demo implementation)
this is a proof of concept for how TCP data can be streamed through to a receiver via a proxy server (with a static IP)

This project demos how streams can be sent via TCP from a client through to a TCP server and the processed streams can be sent through to the receiver via a proxy server with a static IP.

This project consists of demo implementation of each step of the data transfer.

## Try it out?
clone this directory 

```bash
git clone https//github.com/israeladura/tcp-proxy
```

To begin open up for terminal tabs.
to run the `receiver` server, navigate to the `receiver` directory

```bash
nodemon index.js
```
or
```bash
node index.js
```
also, start the `server` and `proxy-server` in the same fashion.

lastly, start the client in similar fashion (this automatically sends through a readable stream of data from the txt file contained in the project).

Note: the TCP client is to be started last as it requires the servers running before it can establish a connection, else they will be a chain of erros sent down.

## License
MIT