class JobSchedulerService {
  constructor({ jobRepository }) {
    this.jobRepository = jobRepository;
    this.jobs = [];
  }

  // Check every 10 minutes: What all jobs should be executed in next 10 minutes
  checkJobs() {
    setInterval(() => {
      const currentTime = new Date();
      const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60000);
      const jobsToRun = this.jobRepository.getJobsForNext10Mins(
        currentTime,
        tenMinutesLater
      );
      console.log(16, jobsToRun);
    }, 600000);
  }

  addJob(job) {
    this.jobs.push(job);
  }

  runJobs() {
    this.jobs.forEach((job) => {
      job.run();
    });
  }
}
