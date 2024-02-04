//import exchange rates for each country listed in the emoji flags array

import axios from "axios";

//Get the rates for various countries
const getRates = async () => {
  //This is disabled because I fetched the data and saved it in local storage for future use
  const res = await axios("https://api.frankfurter.app/latest?from=USD");
  console.log(res.data["rates"])
  // localStorage.setItem("rates", JSON.stringify(res.data.rates))

  const emojiFlags = {
    AUD: "🇦🇺",
    BGN: "🇧🇬",
    BRL: "🇧🇷",
    CAD: "🇨🇦",
    CHF: "🇨🇭",
    CNY: "🇨🇳",
    CZK: "🇨🇿",
    DKK: "🇩🇰",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    HKD: "🇭🇰",
    HUF: "🇭🇺",
    IDR: "🇮🇩",
    ILS: "🇮🇱",
    INR: "🇮🇳",
    ISK: "🇮🇸",
    JPY: "🇯🇵",
    KRW: "🇰🇷",
    MXN: "🇲🇽",
    MYR: "🇲🇾",
    NOK: "🇳🇴",
    NZD: "🇳🇿",
    PHP: "🇵🇭",
    PLN: "🇵🇱",
    RON: "🇷🇴",
    SEK: "🇸🇪",
    SGD: "🇸🇬",
    THB: "🇹🇭",
    TRY: "🇹🇷",
    ZAR: "🇿🇦",
  };

  const rateSelect = document.getElementById("rateSelect");
  const rates = JSON.parse(localStorage.getItem("rates"));
  for (const rate in rates) {
    console.log(rate);
    console.log(rates[rate]);

    let option = document.createElement("option");
    option.setAttribute("value", `${rate}`);

    if (emojiFlags[rate]) {
      let flag = emojiFlags[rate];
      option.innerHTML = `${flag} ${rate} ${rates[rate]}`;
    } else {
      console.error(`Flag not found for currency code ${rate}`);
    }

    rateSelect.appendChild(option);
  }
};


//Fetch the job listings from Adzuna
const getJobListings = async() => {
  try {
    const res = await axios("http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=640789aa&app_key=804950c4953157bcce87e26ba7f050e0&results_per_page=20&what=javascript%20developer&content-type=application/json")
  console.log(res.data.results)
  localStorage.setItem("jobListings", JSON.stringify(res.data.results))
  res.data.results.forEach((job) => {
    console.log(job);

    // Replace undefined values with "No value given"
    const getSafeValue = (value) => value ?? "No value given";

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
    document
      .querySelector(".jobs-list")
      .insertAdjacentHTML("beforeend", jobListing);
  });
  } catch (error) {
    console.log("Error fetching job listings:", error)
  }
  
};

//Calculate local pay for any US salary
const calculateAnySalary = () => {
  //calculate the salary for any given rate
const salaryBtn = document.querySelector(".salary-button");

salaryBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const selectedRate = document.getElementById("rateSelect").value;

  const exchangeRate = JSON.parse(localStorage.getItem("rates"))[selectedRate];

  if (!exchangeRate) {
    console.error("Exchange rate not found for selected currency");
    return;
  }

  const equivSalaryContainer = document.querySelector(".equiv-salary");
  equivSalaryContainer.innerHTML = "";

  const form3Value = document.querySelector("#form3").value;

  const equivalent_salary = exchangeRate * form3Value;
  const p = document.createElement("p");
  p.innerHTML = `The equivalent salary for ${selectedRate} is $${equivalent_salary.toFixed(
    2,
  )}`;
  p.style = "text-align: center; color: white;";
  equivSalaryContainer.appendChild(p);
});
}


export {getRates, getJobListings, calculateAnySalary}