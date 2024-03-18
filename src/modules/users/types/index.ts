import { ROLE, SIGNUP_METHOD, SOCIAL_SIGNUP_METHOD } from '../../../constants';

type SocialUserCreationAttrs = {
  method: SOCIAL_SIGNUP_METHOD;
  profileUrl: string;
};

type ManualUserCreationAttrs = {
  password: string;
};

type CreateUserAttrs = {
  firstName: string;
  lastName: string;
  email: string;
} & (ManualUserCreationAttrs | SocialUserCreationAttrs);

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  profileUrl: string | null;
  profileKey: string | null;
  signupMethod: SIGNUP_METHOD;
  role: ROLE;
  password: string | null;
  birthDate: Date | null;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export { CreateUserAttrs, User };
