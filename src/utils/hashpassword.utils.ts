import bcrypt from "bcrypt";
const saltrounds = 10;

// this will hash a normal password
async function hashPassword(plainPassword: string) {
  const hashedPassword = await bcrypt.hash(plainPassword, saltrounds);
  return hashedPassword;
}

// this will compare a normal password and hashed password
async function isValidPassword(
  userGivenPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(userGivenPassword, hashedPassword);
}

export { hashPassword, isValidPassword };
