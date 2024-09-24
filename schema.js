const Joi = require("joi");

const ListingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(1),
        image: Joi.string().allow("", null),
        category: Joi.string().required(),
    }).required()
});

const ReviewSchema = Joi.object({
    Review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});



module.exports =  {ListingSchema,ReviewSchema};

