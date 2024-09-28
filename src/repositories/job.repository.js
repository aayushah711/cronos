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
