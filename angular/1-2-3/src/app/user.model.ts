export interface UserModel {
  email: string; // mandatory, must be a email
  name: string; // mandatory, max 128 characters
  birthday?: Date; // Not mandatory, must be less than today
  address: { // mandatory
    zip: number; // mandatory
    city: string; // mandatory, must contains only alpha uppercase and lower and space
  };
}
  