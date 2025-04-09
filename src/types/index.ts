export type CreateComment = {
  user_id: string;
  comment: string;
};

export type GetComment = {
  id: string;
  user_id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserProps;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};
