import { v4 as uuidv4 } from 'uuid';

export const generateUUID = (): string => {
  const prefix = 'work_';
  const randomDigits = Math.floor(100 + Math.random() * 900); // Número aleatório de 100 a 999
  return prefix + randomDigits;
};
