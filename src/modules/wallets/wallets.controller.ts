import type { Request,Response,NextFunction } from "express";
import * as svc from './wallets.service.js';

export async function listWalletsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const wallets = await svc.listWallets(req.user!.id);
    res.json(wallets);
  } catch (error) {
    next(error);
  }
}

export async function getWalletHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const wallet = await svc.getWalletById(req.user!.id, req.params.id!);
    if(!wallet){
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

export async function createWalletHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const wallet = await svc.createWallet(req.user!.id, req.body);
    if (!wallet) {
      return res.status(400).json({ message: 'Failed to create wallet' });
    }
    res.status(201).json(wallet);
  } catch (error) {
    next(error);
  }
}

export async function updateWalletHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const wallet = await svc.updateWallet(req.user!.id, req.params.id!, req.body);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

export async function deleteWalletHandler(req: Request, res: Response, next: NextFunction) {
  try {
    await svc.deleteWallet(req.user!.id, req.params.id!);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}