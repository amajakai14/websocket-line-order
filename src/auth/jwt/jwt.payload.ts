import { User } from '../../model/user';

export type JWTPayloadUser = {
  saltRounds: number;
  userId: number;
  loginId: string;
  mailAddress: string;
};

export type UserWithoutPassword = Pick<
  User,
  'userId' | 'loginId' | 'mailAddress'
>;
