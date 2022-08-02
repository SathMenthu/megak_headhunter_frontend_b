import { RoleEnum } from '../types';

export const userRedirect = (role: RoleEnum | undefined): string => {
  switch (role) {
    case 'ADMIN':
      return '/admin-dashboard';
    case 'STUDENT':
      return '/student-dashboard';
    case 'HR':
      return '/hr-dashboard';
    default:
      return 'logout';
  }
};
