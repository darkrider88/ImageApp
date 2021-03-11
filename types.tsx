export type RootStackParamList = {
  Root: undefined;
  ChatRoomScreen: undefined;
  Contacts: undefined;
};

export type MainTabParamList = {
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: string,
  name: string,
  imageUri: string,
};

export type Message = {
  id: string,
  content: string,
  createdAt: string,
  user: User,
};

export type ChatRoom = {
  id: string,
  users: [User],
  lastMessage: Message
}
