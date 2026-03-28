import pinoHttp from "pino-http";

export const logger = pinoHttp({
  level: "info",

  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});