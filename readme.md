Overview
Build our own Job scheduler similar to the cron system in Linux & Mac. Users can define in the system
Requirements
User wants to execute a particular task. That task will have commands like node filename.js. Don’t worry whether a file exists in the machine or not.
Support 2 types of job submission.
Immediate
Recurring: API should support cron syntax. Eg. “0 0 12 \* \* ?” means Fire at 12:00 p.m. (noon) every day
CRUD for jobs
Retries. User should get the option to configure how many times the job should run in case of failure
Store the console output in a log file, upload that file on AWS S3 & provide the link for the same to user
Make sure the job runs at the exact time. A little early or a huge delay is not the ideal solution.
Non functional Requirements
Concurrency - 2 users submitting tasks for the same time should not face latency during execution
Scalability
Availability

System design

Job lifecycle

Database design
User
id, name, email, password.
Jobs
id, name, isActive, command(function to be executed), type(once, recurring), minute, hour, dayOfMonth, month, dayOfWeek, timezone, startTime(optional), endTime(optional), nextScheduleTime, retries
Executions
id, jobId, status(pending, started, completed, failed), scheduledTime, executionTime, outputUrl
Backend APIs
Auth
Signup/register
Login
Logout
User/Profile
Get user details
Update user details
Jobs
Create
Read
Update
Delete
Executions
Get

Overall Approach

I am going to store the cron syntax in a postgresql db in the form of following columns:
minute (0 - 59 Or _)
hour (0 - 23 Or _)
day of the month (1 - 31 Or _)
month (1 - 12 Or _)
day of the week (0 - 7, both 0 and 7 represent Sunday Or \*)

In my Scheduler service, every minute I will fetch all rows(jobs) that match the current time. If there are any jobs I will execute them concurrently using worker threads to offload processing to separate threads, ensuring the main event loop is not blocked.

Once a job is completed, I will do the following updates in db:
If job is of type once, set status as inactive, set nextScheduleTime as null
If the job is recurring, set the correct nextScheduleTime, add a new entry in the Executions table.

If a job fails, add a new entry in the Executions table, keep a count of retries. Keep retrying until the number of retries matches the configured retries.
