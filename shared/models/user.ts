export interface User {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

// export function createUser({ id, firstName, lastName, email, company }): User {
//   return { id, firstName, lastName, email, company };
// }

// export function createUsers(data: User[]): User[] {
//   return data.map(createUser);
// }
