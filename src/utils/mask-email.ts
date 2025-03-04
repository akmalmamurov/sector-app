export const maskEmail = (email: string): string => {
  const emailRegex = /^(.{2}).+(.{2}@.+)$/; 
  return email.replace(emailRegex, "$1...$2");
};