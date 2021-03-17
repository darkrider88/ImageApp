export type RootStackParamList = {
  Root: undefined;
  ChatRoomScreen: undefined;
  Contacts: undefined;
};

export type MainTabParamList = {
  Chats: undefined;
  Users: undefined;
  Profile: undefined;
};

export type TabThreeParamList = {
  Profile: undefined;
};

export type TabTwoParamList = {
  Users: undefined;
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
