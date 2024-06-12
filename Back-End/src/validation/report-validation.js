import Joi from "joi";

const validationCustomReport = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});


export { validationCustomReport }

