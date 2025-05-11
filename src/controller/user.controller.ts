import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

interface Params {
    id: string;
}

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ users });
    } catch (err) {
        next(err);
    }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = await req.body;
        if (!name || !email) {
            res.json({ msg: "body is null" });
            return;
        }

        const newUser = await prisma.user.create({
            data: { name, email },
        });
        if (!newUser) {
            res.json({ msg: "Error to add" });
            return;
        }

        res.json({ newUser, msg: "Success" });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, email, name } = await req.body;
        if (!id || !email || !name) {
            res.json({ msg: "body is null" });
            return;
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { email, name },
        });
        if (!updateUser) {
            res.json({ msg: "Can't update" });
            return;
        }
        res.json({ updatedUser });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            res.json({ msg: "Params is null" });
            return;
        }
        const user = await prisma.user.delete({
            where: { id },
        });
        if (!user) {
            res.json({ msg: "user can't delete" });
            return;
        }
        res.json({ user });
    } catch (err) {
        next(err);
    }
};
