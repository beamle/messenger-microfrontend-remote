import React, { useEffect } from 'react';
import s from "./Messenger.module.scss"
import { Button } from "../../ui/components/Button/Button";
import { Input, InputType } from "../../ui/components/Input/Input";
import { Card } from "../../ui/components/Card/Card";
import { Text } from "../../ui/components/Text/Text";
import { MessengerWebsocketApi } from "src/ui/messenger-websocket-api";

// 32.10 https://www.youtube.com/watch?v=KaLd_sP78-4&t=633s

export type UsersItemType = {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VOICE = "VOICE"
}

enum MessengerEvent {
  RECEIVE_MESSAGE = "receive-message",
  MESSAGE_SENT = "message-sent",
  UPDATE_MESSAGE = "update-message",
  MESSAGE_DELETED = "message-deleted",
  ERROR = "error"
}

type MessageSendRequest = {
  message: string
  reeiverId: number
}

const messages:UsersItemType[] = [{id: 1, isRead: true, message: 'banan', notifyAt: 'today'}, {id: 2, isRead: false, message: 'apple', notifyAt: 'yesterday'}, {id: 3, isRead: true, message: 'orange', notifyAt: 'tomorrow'}]

const Messenger = ({accessToken}: {accessToken: string}) => {
  const connectMessengerSocket = (accessToken: string) => {
    // NB! Method to LISTEN for BE responses
    MessengerWebsocketApi.createConnection('accesstoken') // TODO: get access token

    MessengerWebsocketApi.socket?.on(MessengerEvent.RECEIVE_MESSAGE, (data: UsersItemType) => {
      // lsitener is callback that is handling received data manipulation
      console.log(data)
    })
    MessengerWebsocketApi.socket?.on(MessengerEvent.MESSAGE_SENT, (data: UsersItemType) => {
      console.log(data)
    })
    MessengerWebsocketApi.socket?.on(MessengerEvent.UPDATE_MESSAGE, (data: UsersItemType) => {
      console.log(data)
    })
    MessengerWebsocketApi.socket?.on(MessengerEvent.MESSAGE_DELETED, (data: UsersItemType) => {
      console.log(data)
    })
    MessengerWebsocketApi.socket?.on(MessengerEvent.ERROR, (data: UsersItemType) => {
      console.log(data)
    })
    MessengerWebsocketApi.socket?.onAny( (event, ...args) => {
      console.log(event)
      console.log(args)
    })

  }

  const sendEvenet = () => {
    // NB! Emit is used to SEND data to BE
    MessengerWebsocketApi.socket?.emit(MessengerEvent.RECEIVE_MESSAGE, {message:"SOME", receiverId: 9999})
  }
  useEffect(() => {
    connectMessengerSocket(accessToken)
  }, []);




  return (
    <div className={s.messenger}>
      <div className={s.usersContainer}>
        <div className={s.search}>
          <Input as={'input'} type={InputType.SEARCH} placeholder={"Search user"}></Input>
        </div>
        <div className={s.usersListContainer}>
          <Card
            isOpen={true}
            className={s.usersList}
            setIsOpen={() => {}}>

            {messages?.map(item => (
              <div key={item.id} className={s.userMessageContainer}>
                <Text
                  as={'p'}
                >
                  {item.message}
                </Text>
              </div>
            ))}
          </Card>
        </div>
      </div>
      <div className={s.chatContainer}>
        <div className={s.myUserBox}>
          NNikita
        </div>
        <div className={s.chatList}>

        </div>
        <div className={s.chatInput}>
          <Button>Click</Button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;