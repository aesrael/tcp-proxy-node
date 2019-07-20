/**
 * this is a demo of the tcp server, it receives data streams from a
 * tcp client, and responds accordingly with the transformed data which it sends
 * to a proxy server via a tcp connection, the proxy server(with a static ip address)
 * then sends the data through to the receiver
 *
 */

const net = require('net')
const { localhost, localport, proxyPort, proxyHost } = require('../config')

const server = net.createServer(socket => {
  const proxy = new net.Socket()
  proxy.connect(proxyPort, proxyHost, () =>
    console.log('connection to proxy successful'),
  )

  socket.on('connect', data => {
    console.log(
     'connected established with',
      socket.remoteAddress,
      socket.remotePort
    )
  })

  socket.on('data', data => {
    console.log(
      'streaming data to proxy @',
      proxyHost,
      proxyPort,
    )
    proxy.write(data)
  })

  socket.on('error', err => {
    console.log(err)
    socket.destroy()
  })

  socket.on('close', () => {
    console.log('closing proxy')
    proxy.end()
  })
})

server.listen(localport, localhost)

console.log(
  `TCP server listening @${localhost}:${localport}`
)
