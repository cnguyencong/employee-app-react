import React, { useEffect, useState } from 'react';
import Context from './index';
import axios from 'axios';
import { ChatApi, ChatMemberApi } from '../../api';

const ChatProvider = (props: any) => {
  const [allMemberss, setAllMembers] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false);
  const [memberss, setMembers] = useState<any>();
  const [chatss, setChats] = useState<any>([]);
  const [currentUserr, setCurrentUser] = useState();
  const [selectedUserr, setSelectedUser] = useState();
  const getChatMembersData = async () => {
    try {
      await axios.get(ChatMemberApi).then((resp) => {
        setAllMembers(resp.data);
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getChatMembersData();
  }, [setAllMembers, setMembers, setSelectedUser, setCurrentUser, setChats]);

  const getMembersSuccess = (chats: any) => {
    setCurrentUser(chats[0]);
    setMembers(chats);
  };

  const fetchChatMemberAsyn = () => {
    if (allMemberss.length > 0) getMembersSuccess(allMemberss);
  };

  useEffect(() => {
    const getChatData = async () => {
      try {
        await axios.get(ChatApi).then((resp) => {
          setChats(resp.data);
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    getChatData();
  }, [setChats]);

  const getChatsSuccess = (chats: any, selectedUser: any, online?: boolean) => {
    if (allMemberss.length > 0) {
      setChats(chats);
      setSelectedUser(allMemberss.find((x: any) => x.id === selectedUser));
    }
  };

  const updateSelectedUser = (selectedUser: any, online: boolean) => {
    if (allMemberss.length > 0) return allMemberss.find((x: any) => x.id === selectedUser);
  };

  const fetchChatAsyn = () => {
    if (chatss?.data?.length > 0) {
      const currentUserId = 0;
      const online = true;

      const chat = chatss.data.filter((x: any) => x.users.includes(currentUserId));
      const selectedUser = chatss.data[0].users.find((x: any) => x !== currentUserId);

      getChatsSuccess(chat, selectedUser, online);
      updateSelectedUser(selectedUser, online);
    }
  };

  const sendMessageToChat = async (currentUserId: string, chats: any) => {
    try {
      await axios.put(`${ChatApi}/${chats.data[currentUserId].id}`, chats.data[currentUserId]);
    } catch (error) {
      console.log('error', error);
    }
  };

  const sendMessageAsyn = (currentUserId: string, selectedUserId: string, messageInput: string, chats: any, online: boolean) => {
    let chat = chats.find((x: any) => x.users.includes(currentUserId) && x.users.includes(selectedUserId));
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    const status = online;
    if (chat) {
      chat.messages.push({
        sender: currentUserId,
        time: time,
        text: messageInput,
        status: true,
      });
      chat.lastMessageTime = time;
      chat.online = status;

      let chats_data = chats.filter((x: any) => x.id !== chat.id);
      chats_data.splice(0, 0, chat);
      getChatsSuccess(chats, selectedUserId, online);
    }
    setTimeout(() => {
      sendMessageToChat(currentUserId, chats);
    }, 1000);
  };

  const replyByUserAsyn = (currentUserId: string, selectedUserId: string, replyMessage: string, chats: any, online: boolean) => {
    let chat = chats.find((x: any) => x.users.includes(currentUserId) && x.users.includes(selectedUserId));
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    const status = online;
    if (chat) {
      chat.messages.push({
        sender: selectedUserId,
        time: time,
        text: replyMessage,
        status: true,
      });
      chat.lastMessageTime = time;
      chat.online = status;
      let chats_data = chats.filter((x: any) => x.id !== chat.id);
      chats_data.splice(0, 0, chat);

      getChatsSuccess(chats_data, selectedUserId, online);
    }

    sendMessageToChat(currentUserId, chats);
  };

  const createNewChatAsyn = (currentUserId: string, selectedUserId: string, chats: any) => {
    let conversation = {
      id: chats.length + 1,
      users: [currentUserId, selectedUserId],
      lastMessageTime: '-',
      messages: [],
    };
    chats.splice(0, 0, conversation);
    getChatsSuccess(chats, selectedUserId);
  };

  const changeChat = (userID: string) => {
    setSelectedUser(allMemberss.find((x: any) => x.id === userID));
  };

  const searchMember = (keywords: string) => {
    if (keywords === '') {
      setMembers(allMemberss);
    } else {
      const keyword = keywords.toLowerCase();
      const searchedMembers = allMemberss.filter((member: any) => member.name.toLowerCase().indexOf(keyword) > -1);
      setMembers(searchedMembers);
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        allMemberss,
        chatss,
        selectedUserr,
        currentUserr,
        memberss,
        menuToggle,
        setMenuToggle,
        getChatsSuccess: getChatsSuccess,
        updateSelectedUserr: updateSelectedUser,
        fetchChatAsyn: fetchChatAsyn,
        fetchChatMemberAsyn: fetchChatMemberAsyn,
        sendMessageAsyn: sendMessageAsyn,
        replyByUserAsyn: replyByUserAsyn,
        createNewChatAsyn: createNewChatAsyn,
        changeChat: changeChat,
        searchMember: searchMember,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default ChatProvider;
