class JobSchedulerService {
  constructor({ jobRepository }) {
    this.jobRepository = jobRepository;
    this.jobs = [];
    this.interval = null;
    this.timeouts = [];
  }

  checkJobsAndAddToQueue() {
    this.interval && clearInterval(this.interval);
    this.checkJobs();
    this.interval = setInterval(
      this.checkJobs,
      // }, 3000);
      600000
    );

    //
  }

  // Check every 10 minutes: What all jobs should be executed in next 10 minutes
  async checkJobs() {
    try {
      const currentTime = new Date();
      const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60000);
      const jobsToRun = await this.jobRepository.getJobsForNext10Mins(
        currentTime,
        tenMinutesLater
      );
      if (jobsToRun.length) {
        this.timeouts = [];
        jobsToRun.forEach((job) => {
          this.addJobToQueue(job);
        });
      }
    } catch (error) {}
  }

  addJobToQueue(job) {
    // add a setTimeout for each job to get executed
    console.log(16, job);
    // {
    //   id: '1846c6de-86f1-4b23-aee9-1fd883303044',
    //   title: 'Job 5',
    //   description: 'Job 1 description',
    //   isActive: true,
    //   command: "console.log('Hello World!');",
    //   type: 'once',
    //   minute: '25',
    //   hour: '14',
    //   dayOfMonth: '*',
    //   month: '*',
    //   dayOfWeek: '*',
    //   timezoneOffsetMinutes: -330,
    //   startTime: 2021-07-20T00:00:00.000Z,
    //   endTime: 2021-07-20T00:00:00.000Z,
    //   retries: 3,
    //   createdAt: 2024-11-10T04:38:51.096Z,
    //   updatedAt: 2024-11-10T04:38:51.096Z,
    //   userId: 'bdf8adcc-7764-44dd-9031-8be8e4f856fb'
    // }

    let timeLeft = job.minute - new Date().getMinutes();

    this.timeouts.push(
      setTimeout(() => {
        // execute job.command
        console.log(16, job.command);
      }, timeLeft * 60000)
    );
  }

  runJobs() {
    this.jobs.forEach((job) => {
      job.run();
    });
  }
}

module.exports = JobSchedulerService;
