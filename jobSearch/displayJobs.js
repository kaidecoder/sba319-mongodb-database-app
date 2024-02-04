// fetch jobs from Adzuna and display 
export function displayJobs() {
    JSON.parse(localStorage.getItem("jobListings")).forEach((job) => {
      console.log(job);
  
      const getSafeValue = (value) => value ?? "No value given";
  
      const formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(job.salary_max);
  
      const jobListing = `
          <div class="job-info" style="background-color: #ccc;">
            <h2 class="company"><span>Company:</span> ${
              job.company["display_name"]
            }</h2>
            <p class="id"><span>ID:</span> ${job.id}</p>
            <p class="title"><span>Title:</span> ${job.title}</p>
            <p class="salary"><span>Salary:</span> ${formatted}</p>
            <p class="location"><span>Location:</span> ${job.location.area}</p>
            <p class="description"><span>Description:</span> ${
              job.description
            }</p>
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
      document
        .querySelector(".jobs-list")
        .insertAdjacentHTML("beforeend", jobListing);
    });
  }