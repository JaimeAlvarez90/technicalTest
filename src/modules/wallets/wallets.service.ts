import prisma from "../../db/prisma.js";
import type { WalletCreateInput,WalletUpdateInput } from "../../schemas/wallet.schema.js";

export function listWallets(userId: string) {
  return prisma.wallet.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

export function getWalletById(userId: string, walletId: string) {
  return prisma.wallet.findUnique({
    where: {
      id: walletId,
      userId
    }
  })
}

export function createWallet(userId: string, data: WalletCreateInput) {
  return prisma.wallet.create({
    data: {
      ...data,
      userId,
      tag: data.tag === undefined ? null : data.tag
    }
  })
}

export async function updateWallet(userId: string, walletId: string, data: WalletUpdateInput) {
  const currentData=await prisma.wallet.findUnique({
    where: {
      id: walletId,
      userId
    }
  })
  if(!currentData) {
    throw Object.assign(new Error('Wallet not found'), { statusCode: 404 });
  }
  return prisma.wallet.update({
    where: {
      id: walletId,
      userId
    },
    data: {
      ...(data.chain !== undefined ? { chain: { set: data.chain } } : {}),
      ...(data.address !== undefined ? { address: { set: data.address } } : {}),
      tag: { set: data.tag === undefined ? null : data.tag }
    }
  })
}

export async function deleteWallet(userId: string, walletId: string) {
  const currentData=await prisma.wallet.findUnique({
    where: {
      id: walletId,
      userId
    }
  })
  if(!currentData) {
    throw Object.assign(new Error('Wallet not found'), { statusCode: 404 });
  }
  await prisma.wallet.delete({
    where: {
      id: walletId,
      userId
    }
  })
}