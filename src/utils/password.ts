import bcrypt from "bcryptjs"

export const getHashPassword = async (plainText: string): Promise<string | undefined> => {
  try {
	  const hashText = await bcrypt.hash(plainText,10);
	  return hashText;
  } catch (error) {
	  throw new Error("Error while hashing password");
  }
};
