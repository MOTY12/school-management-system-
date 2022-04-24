"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigValidationSchema = exports.AppConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.AppConfig = process.env;
const Joi = require("joi");
exports.AppConfigValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    NAME: Joi.string().required(),
    PORT: Joi.number().required(),
    APPLICATION_KEY: Joi.string().required(),
    DATABASE_URI: Joi.string().required(),
});
//# sourceMappingURL=app.config.js.map