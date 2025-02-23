"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createUserService(dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email
        });

        const userSaved = await userRepository.save(newUser);

        return userSaved;
    } catch (error) {
        console.error('Error al crear un usuario: ', error);
    }
}

export async function getUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        return userFound;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}
export async function updateUserService(id, user) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({
            where: {id}
        });
        if (!userFound) {
            return null;
        }
        await userRepository.update(id, user);
        const userData = await userRepository.findOne({
            where: {id}
        });
        return userData;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({
            where: {id}
        });
        const userDeleted = await userRepository.remove(userFound);
        return userDeleted;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
}