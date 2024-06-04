import { io, Socket } from 'socket.io-client'

export class MessengerWebsocketApi {
  static socket: null | Socket = null

  static createConnection(accessToken: string) {
    const queryParams = {
      query: {
        accessToken, // TODO: get accesstoken
      },
    }

    this.socket = io(
      process.env.NEXT_PUBLIC_NOTIFICATIONS_SOCKET_API || 'https://inctagram.work/',
      queryParams
    )

    this.socket.on('connect', () => {
      // This is also a listener for backend response. If BE respond with 'connect' event, then we console.log
      console.log('connect to messenger socket')
    })

    this.socket.on('disconnect', e => {
      console.log('disconnect from messenger socket', e)
    })
  }

  static disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      console.log('disconnected from messenger socket')
    }
  }
}
