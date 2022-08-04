export const translator = (text: string | boolean | null) => {
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
    case 'AVAILABLE':
      return 'Dostępny';
    case 'HIRED':
      return 'Zatrudniony';
    case 'BUSY':
      return 'W trakcie rozmowy';
    case 'AT LOCATION':
      return 'Na miejscu';
    case 'ONLY REMOTELY':
      return 'Wyłącznie zdalnie';
    case 'WILLINGNESS TO RELOCATE':
      return 'Gotowość do przeprowadzki';
    case 'HYBRID':
      return 'Hybrydowo';
    case 'IRRELEVANT':
      return 'Bez znaczenia';
    case 'ONLY EMPLOYMENT CONTRACT':
      return 'Tylko UoP';
    case 'POSSIBLE B2B':
      return 'Możliwe B2B';
    case 'POSSIBLE MANDATE CONTRACT/CONTRACT WORK':
      return 'Możliwe UZ/UoD';
    case 'NO PREFERENCES':
      return 'Brak preferencji';
    case false:
      return 'NIE';
    case true:
      return 'TAK';
    default:
      return text;
  }
};
