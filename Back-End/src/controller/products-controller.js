import { ResponseError } from '../error/response-error.js';
import { prisma } from '../utils/database.js';
import logger from '../utils/logging.js';
import { createProductValidation, updateProductValidation } from '../validation/product-validation.js';
import { validate } from '../validation/validation.js';
import fs from 'fs';


const createProduct = async (req, res, next) => {
    try {
        const product = req.body;
        product.image = req.file
        const create = await validate(createProductValidation, product);

        const productExist = await prisma.product.findFirst({ where: { name: create.name } });
        if (productExist) throw new ResponseError(400, "Product already exist");

        create.image = req.file.filename;
        const result = await prisma.product.create({ data: create });

        res.status(201).json({
            message: `Create product ${result.name} successfuly`,
            data: result
        })
        logger.info(`Create product ${result.name} successfuly`)

    } catch (error) {
        if (req.file) {
            const filePath = 'uploads/product/' + req.file.filename;
            fs.unlinkSync(filePath);
        }
        logger.error(`Error in create product function: ${error.message}`)
        logger.error(error.stack)
        next(error)
    }
}

const getProducts = async (req, res, next) => {
    try {

        const result = await prisma.product.findMany();

        if (result.length === 0) throw new ResponseError(404, "Product not found");

        res.status(200).json({
            message: "Get products successfully",
            data: result
        });
        logger.info("Get products successfully");

    } catch (error) {
        logger.error(`Error in get products function: ${error.message}`)
        logger.error(error.stack);
        next(error)
    }
}

const getProduct = async (req, res, next) => {
    try {

        const productExist = await prisma.product.findUnique({ where: { id: req.params.productId } });
        if (!productExist) throw new ResponseError(404, "Product not found");

        const result = await prisma.product.findMany({
            where: { id: req.params.productId }
        });


        res.status(200).json({
            message: "Get product successfully",
            data: result
        });
        logger.info("Get product successfully");

    } catch (error) {
        logger.error(`Error in get product function: ${error.message}`)
        logger.error(error.stack);
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const { productId } = req.params;
        product.image = req.file;

        const productExist = await prisma.product.findUnique({ where: { id: productId } });
        if (!productExist) throw new ResponseError(404, "Product not found");

        const productUpdate = await validate(updateProductValidation, product);

        if (req.file) {
            const filePath = `uploads/product/${productExist.image}`;
            fs.unlinkSync(filePath);

            productUpdate.image = req.file.filename;
        }


        const result = await prisma.product.update({
            where: { id: productId },
            data: productUpdate
        });
        res.status(200).json({
            message: `Update product ${result.name} successfuly`,
            data: result
        })
        logger.info(`Update product ${result.name} successfuly`)
    } catch (error) {
        if (req.file) {
            const filePath = 'uploads/product/' + req.file.filename;
            fs.unlinkSync(filePath);
        }
        logger.error(`Error in update product function: ${error.message}`)
        logger.error(error.stack)
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const productExist = await prisma.product.findUnique({ where: { id: productId } });
        if (!productExist) throw new ResponseError(404, "Product not found");

        if (productExist.image) {
            const filePath = `uploads/product/${productExist.image}`;
            fs.unlinkSync(filePath);
        }

        await prisma.product.delete({ where: { id: productId } });

        res.status(200).json({
            message: "Delete product successfuly",
            data: null
        });
        logger.info("Delete product successfuly");
    } catch (error) {
        logger.error(`Error in delete product function: ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
}


const getProductByCategory = async (req, res, next) => {
    try {

        const result = await prisma.product.findMany({
            where: { category: req.params.category }
        });

        if (result.length === 0) throw new ResponseError(404, "Product not found");


        res.status(200).json({
            message: `Get products by category successfully`,
            data: result
        });
        logger.info(`Get products by category successfully`);

    } catch (error) {
        logger.error(`Error in get product by category function: ${error.message}`)
        logger.error(error.stack);
        next(error)
    }
}
export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct,
    getProductByCategory
}