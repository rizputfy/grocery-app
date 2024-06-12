import axios from "axios";
import "dotenv/config";
import { rajaOngkirKey } from "../utils/environment.js";
import logger from "../utils/logging.js";

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = rajaOngkirKey;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const province = async (req, res, next) => {
    try {
        const response = await axios.get('/province');
        res.status(200).json(response.data)
        logger.info("get province successfully")
    } catch (error) {
        logger.error(`Error in get province function ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}

const city = async (req, res, next) => {
    try {
        const response = await axios.get(`/city?province=${req.params.provinceId}`);
        res.status(200).json(response.data)
        logger.info("get city successfully")
    } catch (error) {
        logger.error(`Error in get city function ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}

const cost = async (req, res, next) => {
    try {
        const response = await axios.post('/cost', {
            origin: 78,
            destination: parseInt(req.body.destination),
            weight: req.body.weight,
            courier: req.body.courier
        });
        res.status(200).json(response.data)
        logger.info("get cost successfully");
    } catch (error) {
        logger.error(`Error in get cost function ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}

export default {
    province,
    city,
    cost
}