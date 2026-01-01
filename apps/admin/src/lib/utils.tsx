import { ZodError } from 'zod';

export const slugifyName = (str: string | undefined) => {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const errorHandlingZodError = (message: string) => {
  let msg: string | ZodError[] = message;
  try {
    msg = JSON.parse(msg) as ZodError[];
  } catch (e) {}
  if (typeof msg === 'object') {
    return msg[0].message;
  } else {
    return msg;
  }
};
