/**
 * this is a demo of the proxy server with a static ip address,
 * it receives tcp streams from the tcp server 
 * and pipes the stream of data in a continous fashion as recieved
 * to a receiver
 *
 */

const net = require('net')
const { proxyPort, proxyHost, receiverHost, receiverPort } = require('../config')

const server = net.createServer(socket => {
  console.log('connection to TCP server succesful')

  const receiver = new net.Socket()
  receiver.connect(receiverPort, receiverHost)

  socket.on('connect', data => {
    console.log(
      '>>> connection',
      server.connections,
      socket.remoteAddress,
      socket.remotePort,
    )
  })

  socket.on('data', data => {
    console.log(
      `streaming data to receiver @${receiverHost}:${receiverPort}`,
    )
    receiver.write(data)
  })

  socket.on('close', () => {
    console.log(
      `closing receiver`,
    ),
    receiver.end()
  })
  
  socket.on('error', err => {
    console.log(err)
    socket.destroy()
  })
})

server.listen(proxyPort, proxyHost)

console.log(`proxy server listening @ ${proxyHost}:${proxyPort}`)
