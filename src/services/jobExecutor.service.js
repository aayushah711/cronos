const { Worker } = require("worker_threads");
const fs = require("fs");

class JobExecutorService {
  executeJob(job) {
    const worker = new Worker(job.command, {
      workerData: { job },
      stdout: true,
      stderr: true,
    });

    worker.on("exit", (code) => {
      if (code !== 0) console.log(`Worker stopped with exit code ${code}`);
      console.log("Job executed successfully");
    });

    worker.stdout.on("data", (data) => {
      fs.writeFile("output.txt", data, (err) => {});
    });
  }
}

module.exports = JobExecutorService;
