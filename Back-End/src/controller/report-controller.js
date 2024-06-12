import { prisma } from "../utils/database.js";
import logger from "../utils/logging.js";
import { validationCustomReport } from "../validation/report-validation.js";
import { validate } from "../validation/validation.js";

const getStartDate = (period) => {
    const now = new Date();
    switch (period) {
        case 'today':
            return new Date(now.setHours(0, 0, 0, 0));
        case 'yesterday':
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            yesterday.setHours(0, 0, 0, 0);
            return yesterday;
        case 'week':
            const lastWeek = new Date(now);
            lastWeek.setDate(now.getDate() - 7);
            lastWeek.setHours(0, 0, 0, 0);
            return lastWeek;
        case 'month':
            const lastMonth = new Date(now);
            lastMonth.setMonth(now.getMonth() - 1);
            lastMonth.setHours(0, 0, 0, 0);
            return lastMonth;
        case 'year':
            const lastYear = new Date(now);
            lastYear.setFullYear(now.getFullYear() - 1);
            lastYear.setHours(0, 0, 0, 0);
            return lastYear;
        default:
            return new Date();
    }
};



const report = async (req, res, next) => {
    try {
        const { period } = req.params;
        const startDate = getStartDate(period);
        const orders = await prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: startDate,
                },
                statusOrder: 'SUCCESS'
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                OrderItem: {
                    include: {
                        product: true,
                    },
                },
                Tracking: true,
            }
        });
        res.status(200).json({
            message: `get data orders ${period} successfully`,
            data: orders
        })

        logger.info(`get data orders ${period} successfully`);
    } catch (error) {
        logger.error(`Error in report function: ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}

const customReport = async (req, res, next) => {
    try {

        const report = await validate(validationCustomReport, req.body);

        const start = new Date(report.startDate);
        const end = new Date(report.endDate);
        end.setHours(23, 59, 59, 999);

        const orders = await prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: start,
                    lte: end,
                },
                statusOrder: 'SUCCESS'
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                OrderItem: {
                    include: {
                        product: true,
                    },
                },
                Tracking: true,
            }
        });

        res.status(200).json({
            message: 'get data orders for custom date range successfully',
            data: orders
        });

        logger.info('get data orders for custom date range successfully');
    } catch (error) {
        logger.error(`Error in customReport function: ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
};

export default {
    report,
    customReport
}