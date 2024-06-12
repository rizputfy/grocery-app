import { v4 as order_id } from 'uuid';
import midtransClient from "midtrans-client";
import crypto from "crypto";
import logger from '../utils/logging.js';
import { prisma } from '../utils/database.js';
import { serverKeyMidtrans } from '../utils/environment.js';
import axios from 'axios';
import { ResponseError } from '../error/response-error.js';

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKeyMidtrans
});


const createOrder = async (req, res, next) => {
    try {
        const items = req.body.items;
        const parameter = {
            transaction_details: {
                order_id: order_id(),
                gross_amount: req.body.total,
            },
            credit_card: {
                secure: true,
            },
            // item_details: itemDetails,
            customer_details: {
                first_name: req.user.name,
                email: req.user.email,
                phone: req.user.no_telp
            },
            shipping_address: {
                first_name: req.user.name,
                email: req.user.email,
                phone: req.user.no_telp,
                address: req.body.address,
            },
            // expiry: {
            //     unit: "minutes",
            //     duration: 10
            // },
            callbacks: {
                finish: `http://127.0.0.1:3000/(ini di isi endpoint dari frontend)`,
                error: `http://127.0.0.1:3000/(ini di isi endpoint dari frontend)`,
                pending: `http://127.0.0.1:3000/(ini di isi endpoint dari frontend)`,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        const transactionToken = transaction.token;

        await prisma.$transaction(async (prisma) => {
            // Cek stok untuk setiap item sebelum membuat pesanan
            for (const item of items) {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId }
                });

                if (product.stok < item.quantity) {
                    throw new ResponseError(400, `Insufficient stock for product ${product.name}. Available stock: ${product.stok}, requested: ${item.quantity}`);
                }
            }



            // Buat pesanan setelah stok valid
            await prisma.order.create({
                data: {
                    id: parameter.transaction_details.order_id,
                    userId: req.user.id,
                    totalPrice: req.body.total,
                    shippingPrice: req.body.ongkir,
                    statusOrder: 'PENDING',
                    address: req.body.address,
                    tokenMidtrans: transactionToken,
                    responseMidtrans: JSON.stringify(transaction)
                }
            });

            await prisma.tracking.create({
                data: {
                    status: "PROCESSING",
                    city: req.body.city,
                    userId: req.user.id,
                    orderId: parameter.transaction_details.order_id,
                    note: req.body.note,
                    courier: req.body.courier,
                    estimatedDelivery: req.body.estimated
                }
            });

            const orderItems = items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
                orderId: parameter.transaction_details.order_id
            }));

            await prisma.orderItem.createMany({
                data: orderItems
            });

            // Kurangi stok produk setelah membuat order item
            for (const item of items) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { stok: { decrement: item.quantity } }
                });
            }

            await prisma.cart.deleteMany({
                where: {
                    userId: req.user.id
                }
            });
        });


        // await prisma.$transaction(async (prisma) => {
        //     // Cek stok untuk setiap item sebelum membuat pesanan
        //     for (const item of items) {
        //         const product = await prisma.product.findUnique({
        //             where: { id: item.productId }
        //         });

        //         if (product.stok < item.quantity) {
        //             throw new Error(`Insufficient stock for product ${product.name}. Available stock: ${product.stok}, requested: ${item.quantity}`);
        //         }
        //     }
        // })




        // await prisma.order.create({
        //     data: {
        //         id: parameter.transaction_details.order_id,
        //         userId: req.user.id,
        //         totalPrice: req.body.total,
        //         shippingPrice: req.body.ongkir,
        //         statusOrder: 'PENDING',
        //         address: req.body.address,
        //         tokenMidtrans: transactionToken,
        //         responseMidtrans: JSON.stringify(transaction)
        //     }
        // });

        // await prisma.tracking.create({
        //     data: {
        //         status: "PROCESSING",
        //         city: req.body.city,
        //         userId: req.user.id,
        //         orderId: parameter.transaction_details.order_id,
        //         note: req.body.note,
        //         courier: req.body.courier,
        //         estimatedDelivery: req.body.estimated
        //     }
        // });

        // const orderItems = items.map(item => ({
        //     productId: item.productId,
        //     quantity: item.quantity,
        //     subtotal: item.price * item.quantity,
        //     orderId: parameter.transaction_details.order_id
        // }));


        // await prisma.orderItem.createMany({
        //     data: orderItems
        // })

        // for (const item of items) {
        //     await prisma.product.update({
        //         where: { id: item.productId },
        //         data: { stok: { decrement: item.quantity } }
        //     });
        // }

        // await prisma.cart.deleteMany({
        //     where: {
        //         userId: req.user.id
        //     }
        // })

        console.log(transactionToken);
        res.status(201).json({
            message: 'Create order successfully',
            data: {
                redirect_url: transaction.redirect_url,
                token: transactionToken,
            }
        });

        logger.info(`Create order successfully`);

    } catch (error) {
        logger.error(`Error create order function in: ${error.message}`);
        logger.error(error.stack)
        next(error)
    }
}


const midtransWebhook = async (req, res, next) => {
    try {
        const midtransStatus = req.body.transaction_status;
        const orderId = req.body.order_id;
        const statusCode = req.body.status_code;
        const grossAmount = req.body.gross_amount;

        const dataString = orderId + statusCode + grossAmount + serverKeyMidtrans;
        const SignatureKey = crypto.createHash('sha512').update(dataString).digest('hex');

        if (SignatureKey === req.body.signature_key) {
            const order = await prisma.order.findFirst({ where: { id: orderId } });

            if (!order) throw new ResponseError(404, 'Order not found');

            let newStatus;
            switch (midtransStatus) {
                case 'capture':
                case 'settlement':
                    newStatus = 'SUCCESS';
                    break;
                case 'pending':
                case 'deny':
                    newStatus = 'PENDING';
                    break;
                case 'cancel':
                case 'expire':
                    newStatus = 'CANCELLED';
                    break;
                case 'refund':
                    newStatus = 'Refunded';
                    break;
                default:
                    throw new ResponseError(400, 'Invalid transaction status');
            }

            const updatedOrder = await prisma.order.update({
                where: { id: orderId },
                data: { statusOrder: newStatus },
            });
            res.status(200).json({
                message: 'Midtrans webhook received',
                data: updatedOrder
            });

            logger.info(`Order ${orderId} status updated to ${updatedOrder.statusOrder}`)
            console.log(req.body);
        } else {
            console.log('Invalid signature key');
            throw new ResponseError(400, 'Invalid signature key');
        }

    } catch (error) {
        logger.error(`Error in processing Midtrans webhook: ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
}


const cancelTransaction = async (req, res, next) => {
    try {
        const url = `https://api.sandbox.midtrans.com/v2/${req.body.transaction_id}/cancel`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(serverKeyMidtrans + ':').toString('base64')
        }
        const data = {
            transaction_id: req.body.transaction_id
        };

        const response = await axios.post(url, data, { headers });

        if (response.data.transaction_status == 'cancel') {
            await prisma.order.update({
                data: {
                    statusOrder: 'CANCELLED'
                },
                where: {
                    id: req.body.transaction_id
                }
            });
        }

        res.status(200).json({
            message: response.data.status_message,
            data: response.data,
        });

        logger.info('Cancel order Successfully');
    } catch (error) {
        logger.error(`Error in processing Cancel Transaction : ${error.message}`);
        logger.error(error.stack);
        next(error);
    }
}


const getOrders = async (req, res, next) => {
    try {
        const order = await prisma.order.findMany({
            include: {
                user: true,
                OrderItem: {
                    include: {
                        product: true,
                    },
                },
                Tracking: true,
            },
        });

        if (order.length === 0) throw new ResponseError(404, 'Orders not found');

        res.status(200).json({
            message: "Get orders successfully",
            data: order
        })

    } catch (error) {
        logger.error(`Error in get orders function : ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}


const getOrder = async (req, res, next) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.orderId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                OrderItem: {
                    include: {
                        product: true,
                    },
                },
                Tracking: true,
            },
        });

        if (!order) throw new ResponseError(404, 'Order not found');

        res.status(200).json({
            message: "Get order successfully",
            data: order
        })

    } catch (error) {
        logger.error(`Error in get order function : ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}

const filterOrdersByStatus = async (req, res, next) => {
    try {
        console.log(req.query.status);
        const result = await prisma.order.findMany({
            where: {
                statusOrder: {
                    equals: req.query.status
                }
            },

            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                user: true,
                OrderItem: {
                    include: {
                        product: true,
                    },
                },
                Tracking: true,
            },
        })


        if (result.length === 0) throw new ResponseError(404, 'Order not found')

        res.status(200).json({
            message: "filter order by status successfully",
            data: result
        })
    } catch (error) {
        logger.error(`Error in filter order by status  function : ${error.message}`);
        logger.error(error.stack);
        next(error)
    }
}


export default {
    createOrder,
    midtransWebhook,
    cancelTransaction,
    getOrders,
    getOrder,
    filterOrdersByStatus
}