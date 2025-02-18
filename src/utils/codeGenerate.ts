import { customAlphabet } from 'nanoid';

export const nanoId = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  6,
);
