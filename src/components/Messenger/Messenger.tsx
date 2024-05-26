import React from 'react';
import s from "./Messenger.module.scss"
import { Button } from "../../ui/components/Button/Button";
import { Input, InputType } from "../../ui/components/Input/Input";
import { Card } from "../../ui/components/Card/Card";
import { Text } from "../../ui/components/Text/Text";

export type UsersItemType = {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}
const messages:UsersItemType[] = [{id: 1, isRead: true, message: 'banan', notifyAt: 'today'}, {id: 2, isRead: false, message: 'apple', notifyAt: 'yesterday'}, {id: 3, isRead: true, message: 'orange', notifyAt: 'tomorrow'}]

const Messenger = () => {
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