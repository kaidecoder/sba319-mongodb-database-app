/**
 * ! This program will feature job listings and will allow users to evaluate a US salary from a job posting using various exchange rates.  Users can then determine their local salary based on their local exchange rate.
**/

// main.js
import { getRates, getJobListings } from "./exchange-rate.js";
import { displayRates } from "./displayRates.js";
import { displayJobs } from "./displayJobs.js";
import { calculateAnySalary } from "./exchange-rate.js";

(async function init() {
  // Fetch data and display
  await getRates()
  await getJobListings()
  
  //display flags and country codes
  displayRates();

  // Display job listings
  displayJobs();

  // Calculate and display equivalent salary
  calculateAnySalary()
})();