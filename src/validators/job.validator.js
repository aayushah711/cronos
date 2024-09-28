const Joi = require("joi");
const { jobTypes } = require("../constants");

const createJobValidator = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(100).optional(),
  isActive: Joi.boolean().required(),
  command: Joi.string().min(3).max(100).required(),
  type: Joi.valid(...jobTypes).required(),
  minute: Joi.number().min(0).max(59).required(),
  hour: Joi.number().min(0).max(23).required(),
  dayOfMonth: Joi.number().min(1).max(31).required(),
  month: Joi.number().min(1).max(12).required(),
  dayOfWeek: Joi.number().min(0).max(7).required(),
  timezoneOffsetMinutes: Joi.number().min(-720).max(840).required(),
  startTime: Joi.date().optional(),
  endTime: Joi.date().optional(),
  retries: Joi.number().min(0).max(5).optional(),
});

module.exports = {
  createJobValidator,
};
