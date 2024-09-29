class JobController {
  constructor(jobService, handleError) {
    this.jobService = jobService;
    this.handleError = handleError;
  }

  async getJobs(req, res) {
    try {
      const jobs = await this.jobService.getJobs();
      res.json(jobs);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async createJob(req, res) {
    try {
      const job = await this.jobService.createJob(req.body);
      return res.status(201).json(job);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getJob(req, res) {
    try {
      const job = await this.jobService.getJobById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateJob(req, res) {
    try {
      const job = await this.jobService.updateJob(req.params.id, req.body);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteJob(req, res) {
    try {
      const job = await this.jobService.deleteJob(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = JobController;
