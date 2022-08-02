import { defineStore } from 'pinia';
import axios from 'axios';
import {
  AdminFilters,
  DefaultResponse,
  EditedUserData,
  FilteredUser,
  FilterPayload,
  FindUserResponse,
  FindUsersResponse,
  ManuallyCreatedUser,
  UserBasicData,
  UserFilters,
} from '../types';
import { useSnackbarStore } from './snackbar';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userList: [] as FilteredUser[],
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
  },
});
