import prisma from "../../db/prisma.js";
import { hashPassword } from '../../utils/password.js';
import type { UserCreateInput, UserUpdateInput } from '../../schemas/user.schema.js'

export function listUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function createUser(data: UserCreateInput) {
 const hashedPassword = await hashPassword(data.password);
 return prisma.user.create({
   data: {
     email: data.email,
     password: hashedPassword
   },
   select: {
     id: true,
     email: true,
     createdAt: true,
     updatedAt: true
   }
 });
}

export async function updateUser(id: string, data: UserUpdateInput) {
  const userToUpdate:Partial<UserCreateInput> & {password?: string} = {};
  if(data.email) userToUpdate.email = data.email;
  if(data.password) userToUpdate.password = await hashPassword(data.password);
  return prisma.user.update({
    where: { id },
    data: userToUpdate,
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function deleteUser(id: string) {
 await prisma.user.delete({ where: { id } });
  return { success: true };
}
