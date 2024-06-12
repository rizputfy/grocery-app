import logger from "../utils/logging.js";
import { changePasswordValidation, createUserValidation, updateProfileValidation, updateUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import { compare, encript } from "../utils/bcrypt.js";
import { prisma } from "../utils/database.js";
import fs from 'fs';



const createUser = async (req, res, next) => {
    try {
        const userCreate = await validate(createUserValidation, req.body);
        const userExist = await prisma.user.findFirst({
            where: {
                email: userCreate.email
            }
        });

        if (userExist) throw new ResponseError(400, 'Email already exsist');

        const result = await prisma.user.create({
            data: {
                ...userCreate,
                password: await encript('12345678'),
                image: 'default.jpg',
            }

        });

        res.status(201).json({
            message: "Created account user successfully",
            data: result
        });
        logger.info(`create account ${userCreate.name} successfuly`);
    } catch (error) {
        logger.error(`Error in create user function: ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        const userUpdate = validate(updateUserValidation, req.body);

        if (req.file) {
            const filePath = `uploads/user/${user.image}`;
            if (user.image !== 'default.jpg') {
                fs.unlinkSync(filePath);
            }
            userUpdate.image = req.file.filename;
        }

        const result = await prisma.user.update({
            data: {
                ...userUpdate
            },

            where: {
                id: userId
            }
        });
        res.status(200).json({
            message: "user update successfully",
            data: result,
        });

        logger.info(`User ${result.name} updated successfuly`);
    } catch (error) {
        if (req.file) {
            const filePath = `uploads/user/${req.file.filename}`;
            fs.unlinkSync(filePath);
        }
        logger.error(`Error in update user function: ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user || user.isActive == 0) {
            throw new ResponseError(404, "User not found");
        }

        await prisma.user.delete({
            where: {
                id: userId
            }
        });

        if (user.image && user.image !== 'default.jpg') {
            const userImagePath = `uploads/user/${user.image}`;
            fs.unlinkSync(userImagePath);
        }

        res.status(200).json({
            message: "User delete successfully",
            data: null
        });
        logger.info("User delete successfully");
    } catch (error) {
        logger.error(`Eror in delete user function: ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const result = await prisma.user.findMany();

        if (result.length === 0) {
            throw new ResponseError(404, 'User not found');
        }

        res.status(200).json({
            message: "OK",
            data: result
        });
        logger.info("get users successfully");
    } catch (error) {
        next(error);
    }
};


const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!data) {
            throw new ResponseError(404, 'User is not found');
        }

        res.status(200).json({
            message: "OK",
            data: data
        });
        logger.info("get user successfully");
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const email = req.user.email;
        const result = await prisma.user.update({
            data: { token: null },
            where: { email: email },
        });
        res.status(200).json({
            message: `User logged out successfully: ${result.email}`,
            data: null
        });
        logger.info(`User logged out successfully: ${result.email}`);
    } catch (error) {
        logger.error(`Error in logout function: ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}


const changePassword = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await validate(changePasswordValidation, req.body)

        const userExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (!userExists) {
            throw new ResponseError(404, 'User not found');
        }

        const isPasswordValid = await compare(user.oldPassword, userExists.password);

        if (!isPasswordValid) {
            throw new ResponseError(401, 'Password is incorrect');
        }

        const hashedPassword = await encript(user.newPassword);

        await prisma.user.update({
            where: { email: email },
            data: { password: hashedPassword }
        });

        res.status(200).json({
            message: 'Password changed successfully',
            data: null
        });
        logger.info('Password changed successfully');

    } catch (error) {
        logger.error(`Error in changePassword function: ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}


const updateProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) throw new ResponseError(404, 'User not found');

        const user = validate(updateProfileValidation, updateData)

        if (req.file) {
            const filePath = `uploads/user/${userExists.image}`;
            if (userExists.image !== 'default.jpg') {
                fs.unlinkSync(filePath);
            }
        }

        const result = await prisma.user.update({
            data: { name: user.name, image: user.image, no_telp: user.no_telp },
            where: { id: userId },
            select: { id: true, name: true, image: true, no_telp: true }
        });
        res.status(200).json({
            message: 'Profile updated successfully',
            data: result
        });
        logger.info('Profile updated successfully');
    } catch (error) {
        if (req.file) {
            const filePath = 'uploads/user/' + req.file.filename;
            fs.unlinkSync(filePath);
        }
        logger.error(`Error in updateProfile function: ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}


export default {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    logout,
    changePassword,
    updateProfile
}