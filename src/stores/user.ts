import { defineStore } from 'pinia';
import axios from 'axios';
import {
  AdminFilters,
  CheckRegisterDto,
  ConfirmRegisterUserDto,
  DefaultResponse,
  EditedUserData,
  FilteredUser,
  FilterPayload,
  FilterPayloadForHr,
  FindUserResponse,
  FindUsersResponse,
  HrFilters,
  ManuallyCreatedUser,
  UserFilters,
} from '../types';
import { useSnackbarStore } from './snackbar';
import router from '../router';
import { StudentStatus } from '../types/enums/student.status.enum';
import { useAuthStore } from './auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userList: [] as FilteredUser[],
    userForHR: [] as FilteredUser[],
    userForTargetHR: [] as FilteredUser[],
  }),
  getters: {},
  actions: {
    async getAllUsersData(
      page: number,
      limit: number,
      filters: UserFilters | AdminFilters,
    ) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      const payload: FilterPayload<UserFilters | AdminFilters> = {
        page,
        limit,
        filters,
      };

      try {
        const {
          data: { users, isSuccess, total },
        }: { data: FindUsersResponse } = await axios.post(
          'api/user/users',
          payload,
        );
        if (isSuccess) {
          if (users) this.userList = users;
          return total;
        }
      } catch (error) {
        if (error instanceof Error) {
          snackbarMessage =
            'Wystąpił błąd podczas pobierania listy użytkowników.';
          snackbarType = 'error';
          snackbarStore.message = snackbarMessage;
          snackbarStore.type = snackbarType;
        }
      }
    },
    async deleteTargetUser(id: string) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      try {
        const {
          data: { isSuccess },
        }: { data: DefaultResponse } = await axios.delete(`api/user/${id}`);
        if (isSuccess) {
          snackbarMessage = 'Pomyślnie usunięto użytkownika.';
          snackbarType = 'success';
        }
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas usuwania użytkownika.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async editTargetUser(user: EditedUserData) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.patch(
          `api/user/${user.id}`,
          user,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie edytowano użytkownika.';
          snackbarType = 'success';
        }
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas edycji użytkownika.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async createUser(user: ManuallyCreatedUser) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.post(`api/user/`, user);

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie dodano użytkownika.';
          snackbarType = 'success';
        } else {
          snackbarMessage = 'Adres Email jest zajęty!';
          snackbarType = 'error';
        }
        return isSuccess;
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas dodawania użytkownika.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async importUsersFromCSV(file: FormData) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.post(
          `api/user/add-many-students`,
          file,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie zaimportowano użytkowników';
          snackbarType = 'success';
        }
        return isSuccess;
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas importowania użytkowników';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async blockTargetUser(id: string) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.patch(
          `api/user/block/${id}`,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie zablokowano użytkownika.';
          snackbarType = 'success';
        }
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas blokowania użytkownika.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async changePasswordForTargetUser(
      id: string,
      payload: { password: string },
    ) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.patch(
          `api/user/password/${id}`,
          payload,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie zmieniono hasło użytkownika.';
          snackbarType = 'success';
        }
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas zmiany hasła użytkownika.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async checkRegisterLink(
      payload: CheckRegisterDto,
    ): Promise<FilteredUser | void> {
      try {
        const {
          data: { isSuccess, user },
        }: { data: FindUserResponse } = await axios.post(
          `api/user/check-register-link/`,
          payload,
        );
        if (isSuccess && user) {
          return user;
        }
        throw new Error();
      } catch (error) {
        router.push('/login');
      }
    },
    async confirmRegister(user: FilteredUser) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.patch(
          `api/user/confirm-register/${user.activationLink}`,
          user,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie potwierdzono rejestracje konta.';
          snackbarType = 'success';
          router.push('login');
        } else throw new Error();
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas procesu potwierdzania konta';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async closeUserAccount(id: string) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      try {
        const {
          data: { isSuccess },
        }: { data: DefaultResponse } = await axios.patch(
          `api/user/close-account/${id}`,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie zamknięto konto na portalu.';
          snackbarType = 'success';
          router.push('logout');
        } else throw new Error();
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas procesu zamykania konta.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
    async updateUserData(user: ConfirmRegisterUserDto) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      try {
        const {
          data: { isSuccess },
        }: { data: FindUserResponse } = await axios.patch(
          `api/user/${user.id}`,
          user,
        );

        if (isSuccess) {
          snackbarMessage = 'Pomyślnie zaktualizowano konto.';
          snackbarType = 'success';
        } else throw new Error();
      } catch (error) {
        snackbarMessage = 'Wystąpił błąd podczas aktualizacji konta konta.';
        snackbarType = 'error';
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },

    async getAllUsersForHr(
      page: number,
      limit: number,
      filters: HrFilters,
      studentStatus: StudentStatus,
    ) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      const payload: FilterPayloadForHr<HrFilters> = {
        page,
        limit,
        filters,
        studentStatus,
      };

      try {
        const {
          data: { users, isSuccess, total },
        }: { data: FindUsersResponse } = await axios.post(
          'api/user/users-for-hr',
          payload,
        );
        if (isSuccess) {
          if (users) this.userForHR = users;
          return total;
        }
      } catch (error) {
        if (error instanceof Error) {
          snackbarMessage =
            'Wystąpił błąd podczas pobierania listy użytkowników.';
          snackbarType = 'error';
          snackbarStore.message = snackbarMessage;
          snackbarStore.type = snackbarType;
        }
      }
    },
    async getAllUsersForTargetHr(
      page: number,
      limit: number,
      filters: HrFilters,
      studentStatus: StudentStatus,
    ) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      const authStore = useAuthStore();

      const payload: FilterPayloadForHr<HrFilters> = {
        page,
        limit,
        filters,
        studentStatus,
      };

      try {
        const {
          data: { users, isSuccess, total },
        }: { data: FindUsersResponse } = await axios.post(
          `api/user/users-for-hr/${authStore.user?.id}`,
          payload,
        );
        if (isSuccess) {
          if (users) this.userForTargetHR = users;
          return total;
        }
      } catch (error) {
        if (error instanceof Error) {
          snackbarMessage =
            'Wystąpił błąd podczas pobierania listy użytkowników.';
          snackbarType = 'error';
          snackbarStore.message = snackbarMessage;
          snackbarStore.type = snackbarType;
        }
      }
    },

    async reserveTargetUser(id: string) {
      const authStore = useAuthStore();
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      try {
        const {
          data: { isSuccess },
        }: { data: DefaultResponse } = await axios.post(
          `api/user/reserve-user/${id}`,
          authStore.user,
        );
        if (isSuccess) {
          snackbarMessage = 'Udało się zarezerwować kursanta';
          snackbarType = 'success';
        }
      } catch (error) {
        if (error instanceof Error) {
          snackbarMessage =
            'Wystąpił błąd podczas pobierania listy użytkowników.';
          snackbarType = 'error';
        }
      } finally {
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
      }
    },
  },
});
