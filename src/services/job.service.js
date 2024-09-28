class JobService {
  constructor({ jobRepository }) {
    this.jobRepository = jobRepository;
  }

  async createJob(jobData) {
    return this.jobRepository.createJob(jobData);
  }

  async getJobs(jobData) {
    return this.jobRepository.getJobs(jobData.userId);
  }

  async getJobById(id) {
    return this.jobRepository.getJobById(id);
  }
}

module.exports = JobService;
