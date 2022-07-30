import { defineStore } from 'pinia';
import axios from 'axios';
import { AuthLoginData, FilteredUser, FindUserResponse } from '../types';
import { useSnackbarStore } from './snackbar';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as FilteredUser | null,
    isLogged: false,
  }),
  getters: {
    isLoggedIn: (state) => state.isLogged,
    userData: (state) => state.user,
  },
  actions: {
    async login(payload: AuthLoginData) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';

      try {
        const {
          data: { user, isSuccess, message },
        }: { data: FindUserResponse } = await axios.post(
          'api/auth/login',
          payload,
        );

        snackbarMessage = message;

        if (isSuccess) {
          this.user = user ? user : null;
          this.isLogged = true;
          snackbarType = 'success';
          router.push('/dashboard');
        } else {
          snackbarType = 'error';
        }
      } catch (error) {
        snackbarType = 'error';
        snackbarMessage = 'Wystąpił błąd podczas próby logowania.';
      } finally {
        snackbarStore.type = snackbarType;
        snackbarStore.message = snackbarMessage;
      }
    },
    async auth() {
      try {
        const { data }: { data: FilteredUser } = await axios.get('api/auth/me');
        this.user = data;
        this.isLogged = true;
      } catch (error) {
        this.user = null;
        this.isLogged = false;
        router.push('/login');
      }
    },
    async logout(errorOccured: boolean) {
      const snackbarStore = useSnackbarStore();
      let snackbarMessage = '';
      let snackbarType = '';
      try {
        if (errorOccured) {
          const {
            data: { message },
          } = await axios.get('api/auth/logout');
          snackbarMessage = message;
          snackbarType = 'success';
        }
      } catch (error) {
        error && null;
      } finally {
        this.user = null;
        this.isLogged = false;
        snackbarStore.message = snackbarMessage;
        snackbarStore.type = snackbarType;
        router.push('/login');
      }
    },
  },
});
