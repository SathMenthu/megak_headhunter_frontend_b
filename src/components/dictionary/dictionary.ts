export const translator = (text: string) => {
  switch (text) {
    case 'Incorrect login data.':
      return 'Niepoprawne dane logowania.';
    case 'Successfully logged in.':
      return 'Pomyślnie Zalogowano.';
    case 'User successfully logged off.':
      return 'Pomyślnie wylogowano użytkownika';
    default:
      return text;
  }
};
