export const genereteRandomToken = (length: number): string => {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from({ length })
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join("");
};
