import prisma from "../../db/prisma.js";
import { comparePasswords } from "../../utils/password.js";
import { signJWT } from '../../utils/jwt.js';

export async function signIn(email: string, password: string): Promise<{ token: string } | null> {
  const user = await prisma.user.findUnique({where: { email }});
  if (!user) throw Object.assign(new Error('Invalid Credentials'), { status: 401 });

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) throw Object.assign(new Error('Invalid email or password'), { status: 401 });

  const token = signJWT({ userId: user.id, email: user.email });
  return { token };
}

export async function signOut(): Promise<void> {
  return;
}
