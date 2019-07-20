/**
 * this is a demo of the a receiving server, it reveives tcp streams from a proxy
 * server
 *
 */
const net = require('net')
const { receiverHost, receiverPort } = require('../config')

const server = net.createServer(socket => {
  socket.on('connect', () => {
    console.log(
      '>>> receiver connected to proxy server to recieve data >>>',
      server.connections,
      socket.remoteAddress,
      socket.remotePort,
    )
  })

  socket.on('data', data => {
    console.log(data.toString())
    const writeStream = require('fs').createWriteStream('./newFile.txt')

    writeStream.write(data, err => {
      if (err) {
        console.log(`${err.stack} couldn't recreated file`)
      }
    })
  })

  socket.on('close', () => {
    console.log(
      '\n\n\n Data Transfer done >>>>>>>>>>>\n\n check newly created file in the "receiver" server',
    )
    console.log(`Closing TCP connection`)
  })
})
server.listen(receiverPort, receiverHost)
console.log(`receiver listening @${receiverHost}:${receiverPort}`)
