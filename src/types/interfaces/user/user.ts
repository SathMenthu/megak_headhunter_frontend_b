import { RoleEnum } from '../../enums';
import { BaseOfSort, DefaultResponse } from '../global';

export interface UserBasicData {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  permissions: RoleEnum;
  avatar: string
}

export type FilteredUser = Omit<UserBasicData, 'password'>;

export interface FindUserResponse extends DefaultResponse {
  user?: FilteredUser;
}

export interface FindUsersResponse extends DefaultResponse {
  users?: FilteredUser[];
  total?: number;
}

export interface ImportedStudentData {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
  registerToken: string;
}

export interface MinimalInformationToCreateEmail {
  id: string;
  email: string;
  activationLink: string;
}

export interface EditedUserData {
  id: string;
  email: string;
  newPassword: string | null;
  name: string;
  surname: string;
  permissions: RoleEnum[];
}

export interface UserFilters extends BaseOfSort {
  email: string | null;
  name: string | null;
  surname: string | null;
  permission: {
    text: string;
    value: RoleEnum | null;
  };
}
