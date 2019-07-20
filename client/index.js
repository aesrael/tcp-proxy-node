/**
 * this is a demo of the tcp client, it sends tcp streams of a file
 * to the tcp server which transforms the received data and
 * sends to appropriate channels
 *
 */
const net = require('net')
const tcpClient = new net.Socket()
// example video file sent through
const readableStream = require('fs').createReadStream('../file.txt')

const { localhost, localport } = require('../config')

//send data to tcp server
tcpClient.connect(localport, localhost, () => {
  console.log(`Connection to TCP server @${localhost}:${localport} successful`)
  readableStream.pipe(tcpClient)
})

//video data from camera receiver
tcpClient.on('data', data => {
  console.log(`Received: ${data}`)
})

tcpClient.on('error', err => {
  console.log(err)
  tcpClient.destroy()
})

tcpClient.on('close', () => {
  console.log('Connection to TCP server closed')
})

console.log(`TCP client connected to ${localhost}:${localport}\n\n`)