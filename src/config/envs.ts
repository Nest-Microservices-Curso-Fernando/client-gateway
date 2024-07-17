import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsMicroservice: {
    port: envVars.PRODUCTS_MICROSERVICE_PORT,
    host: envVars.PRODUCTS_MICROSERVICE_HOST,
  },
};
