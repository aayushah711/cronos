const { Op } = require("sequelize");
const moment = require("moment");

class JobRepository {
  constructor({ models }) {
    this.Job = models.Job;
  }

  async getJobs(userId) {
    try {
      return await this.Job.find({ where: { userId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getJobsForNext10Mins(currentTime, tenMinutesLater) {
    try {
      // Convert the times to moment objects for easier manipulation
      const currentMoment = moment(currentTime);
      const laterMoment = moment(tenMinutesLater);

      // Extract time components for the current time and the 10 minutes later
      const currentMinute = currentMoment.format("mm");
      const currentHour = currentMoment.format("HH");
      const currentDayOfMonth = currentMoment.format("DD");
      const currentMonth = currentMoment.format("MM");
      const currentDayOfWeek = currentMoment.format("d"); // Sunday = 0

      const laterMinute = laterMoment.format("mm");
      const laterHour = laterMoment.format("HH");
      const laterDayOfMonth = laterMoment.format("DD");
      const laterMonth = laterMoment.format("MM");
      const laterDayOfWeek = laterMoment.format("d"); // Sunday = 0

      return await this.Job.findAll({
        where: {
          minute: {
            [Op.or]: ["*", { [Op.between]: [currentMinute, laterMinute] }],
          },
          hour: {
            [Op.or]: ["*", { [Op.in]: [currentHour, laterHour] }],
          },
          day_of_month: {
            [Op.or]: ["*", { [Op.in]: [currentDayOfMonth, laterDayOfMonth] }],
          },
          month: {
            [Op.or]: ["*", { [Op.in]: [currentMonth, laterMonth] }],
          },
          day_of_week: {
            [Op.or]: [
              "*",
              { [Op.in]: [currentDayOfWeek, laterDayOfWeek] },
              "0",
              "7",
            ],
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getJobById(id) {
    try {
      return await this.Job.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createJob(jobData) {
    try {
      return await this.Job.create(jobData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateJob(id, job) {
    try {
      const [rows] = await this.Job.update(job, {
        where: { id },
        returning: true,
      });
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteJob(id) {
    try {
      return await this.Job.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = JobRepository;
