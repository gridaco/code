import keytar from "keytar";

export const AuthStore = {
  get: () => {
    return keytar.getPassword("cli.grida.co", "access_token");
  },
  set: (token: string) => {
    keytar.setPassword("cli.grida.co", "access_token", token);
  },
  clear: () => {
    keytar.deletePassword("cli.grida.co", "access_token");
  },
};
