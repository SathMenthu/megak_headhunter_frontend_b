export const translator = (text: string | boolean) => {
  switch (text) {
    case 'Incorrect login data.':
      return 'Niepoprawne dane logowania.';
    case 'Successfully logged in.':
      return 'Pomyślnie Zalogowano.';
    case 'User successfully logged off.':
      return 'Pomyślnie wylogowano użytkownika';
    case 'Message sent, check your email.':
      return 'Wiadomość została wysłana, sprawdź swojego maila';
    case 'Account is not activated.':
      return 'Konto nie jest aktywowane.';

    default:
      return text;
  }
};
