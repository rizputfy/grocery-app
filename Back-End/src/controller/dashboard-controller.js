import { prisma } from "../utils/database.js";
import logger from "../utils/logging.js"

const countOrder = async (req, res, next) => {
    try {
        const result = await prisma.order.count({ where: { statusOrder: 'SUCCESS' } });

        res.status(200).json({
            message: "get count order successfully",
            data: result
        })
    } catch (error) {
        logger.error(`Error in count order function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}

const countUser = async (req, res, next) => {
    try {
        const result = await prisma.user.count({ where: { isActive: true } });

        res.status(200).json({
            message: "get count user successfully",
            data: result
        })
    } catch (error) {
        logger.error(`Error in count user function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}

const countProduct = async (req, res, next) => {
    try {
        const result = await prisma.product.count();

        res.status(200).json({
            message: "get count product successfully",
            data: result
        })
    } catch (error) {
        logger.error(`Error in count product function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}


const getTotalPriceSum = async (req, res, next) => {
    try {
        const result = await prisma.order.aggregate({
            _sum: { totalPrice: true }
        });

        res.status(200).json({
            message: "get total price sum successfully",
            data: result._sum.totalPrice
        })
    } catch (error) {
        logger.error(`Error in get total price sum function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}

const getOrderStatusCounts = async (req, res, next) => {
    try {

        const statuses = ['SUCCESS', 'PENDING', 'CANCELLED'];
        const result = {};

        for (const status of statuses) {
            const count = await prisma.order.count({
                where: { statusOrder: status }
            });
            result[status] = count
        }

        res.status(200).json({
            message: "get order status count sum successfully",
            data: result
        })
    } catch (error) {
        logger.error(`Error in get order status count function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}


const getTotalQuantitySold = async (req, res, next) => {
    try {
        const result = await prisma.orderItem.aggregate({
            _sum: { quantity: true }
        });

        res.status(200).json({
            message: "get total quantity sold successfully",
            data: result._sum.quantity
        })
    } catch (error) {
        logger.error(`Error in get total quantity sold function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}


export default {
    countOrder,
    countUser,
    countProduct,
    getTotalPriceSum,
    getOrderStatusCounts,
    getTotalQuantitySold
}