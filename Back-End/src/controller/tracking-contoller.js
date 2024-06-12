import { ResponseError } from "../error/response-error.js";
import { prisma } from "../utils/database.js"
import logger from "../utils/logging.js";

const getTrackings = async (req, res, next) => {
    try {
        const trackings = await prisma.tracking.findMany({
            where: { userId: req.user.id }
        });

        if (trackings.length === 0) throw new ResponseError(404, 'Tracking not found');

        res.status(200).json({
            message: "Get trackings successfully",
            data: trackings
        })
    } catch (error) {
        logger.error(`Error in get trackings function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}

const getTracking = async (req, res, next) => {
    try {
        const trackings = await prisma.tracking.findUnique({
            where: {
                userId: req.user.id,
                id: req.params.trackingId
            }
        });

        if (!trackings) throw new ResponseError(404, 'Tracking not found');

        res.status(200).json({
            message: "Get tracking successfully",
            data: trackings
        })
    } catch (error) {
        logger.error(`Error in get tracking function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}

const updateTracking = async (req, res, next) => {
    try {
        const { trackingId } = req.params;
        const { city, status } = req.body

        const tracking = await prisma.tracking.findUnique({
            where: { id: trackingId }
        })

        if (tracking) throw new ResponseError(404, 'Tracking not found');

        const result = await prisma.tracking.update({
            where: { id: trackingId },
            data: {
                status: status,
                city: city
            }
        })

        res.status(200).json({
            message: "Updated traking successfully",
            data: result
        })

        logger.info("Updated traking successfully")

    } catch (error) {
        logger.error(`Error in update tracking function: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}


export default {
    getTrackings,
    getTracking,
    updateTracking
}