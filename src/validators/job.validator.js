const Joi = require("joi");
const { jobTypes } = require("../constants");

const createJobValidator = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(100).optional(),
  isActive: Joi.boolean().required(),
  command: Joi.string().min(3).max(100).required(),
  type: Joi.valid(...jobTypes).required(),
  minute: Joi.string()
    .pattern(/^\*$|^([0-9]|[1-5][0-9])$/, "minute")
    .required(),
  hour: Joi.string()
    .pattern(/^\*$|^([0-9]|1[0-9]|2[0-3])$/, "hour")
    .required(), // 0-23 or "*"
  dayOfMonth: Joi.string()
    .pattern(/^\*$|^([1-9]|[12][0-9]|3[01])$/, "day of month")
    .required(), // 1-31 or "*"
  month: Joi.string()
    .pattern(/^\*$|^(0?[1-9]|1[0-2])$/, "month")
    .required(), // 1-12 or "*"
  dayOfWeek: Joi.string()
    .pattern(/^\*$|^([0-7])$/, "day of week")
    .required(), // 0-7 or "*"
  timezoneOffsetMinutes: Joi.number().min(-720).max(840).integer().required(),
  startTime: Joi.date().optional(),
  endTime: Joi.date().optional(),
  retries: Joi.number().min(0).max(5).optional(),
});

module.exports = {
  createJobValidator,
};
