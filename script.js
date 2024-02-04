// import axios from "axios";
import express from "express";
const router = express.Router
import axios from "axios";

import JobListings from "./models/jobListing.mjs";

const res = axios.get("http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=640789aa&app_key=804950c4953157bcce87e26ba7f050e0&results_per_page=20&what=javascript%20developer&content-type=application/json")

router.post("/jobList", (req, res) => {
    // const jobs = new JobListings(req.body);
    const jobs = res.forEach(job => {
        const jobListing = `
      <div class="job-info" style="background-color: #ccc;">
        <h2 class="company"><span>Company:</span> ${
          job.company["display_name"]
        }</h2>
        <p class="id"><span>ID:</span> ${job.id}</p>
        <p class="title"><span>Title:</span> ${job.title}</p>
        <p class="salary"><span>Salary:</span> $${job.salary_max.toFixed(2)}</p>
        <p class="location"><span>Location:</span> ${job.location.area}</p>
        <p class="description"><span>Description:</span> ${job.description}</p>
        <p class="contract-time"><span>Contract Time:</span> ${getSafeValue(
          job.contract_time,
        )}</p>
        <p class="contract-type"><span>Contract Type:</span> ${getSafeValue(
          job.contract_type,
        )}</p>
        <p class="created-date"><span>Created:</span> ${getSafeValue(
          job.created,
        )}</p>
      </div>
      `;
    })
    jobs
      .save()
      .then((result) => {
        res.redirect("/jobList");
      })
      .catch((error) => {
        console.log(error);
      });
  });

// .then(res => console.log(res))
// .catch(error => console.error(error))

export default router

