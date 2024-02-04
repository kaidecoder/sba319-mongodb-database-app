// calculate equivalent country salary for any US salary
export function calculateEquivalentSalary() {
    const salaryBtn = document.querySelector(".salary-button");
  
    salaryBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      const selectedRate = document.getElementById("rateSelect").value;
      const exchangeRate = JSON.parse(localStorage.getItem("rates"))[
        selectedRate
      ];
      console.log("selected rate", selectedRate);
      console.log("exchange rate", exchangeRate);
  
      if (!exchangeRate) {
        console.error("Exchange rate not found for selected currency");
        return;
      }
  
      const equivSalaryContainer = document.querySelector(".equiv-salary");
      equivSalaryContainer.innerHTML = "";
  
      const form3Value = document.querySelector("#form3").value;
  
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(form3Value * exchangeRate);
  
      const equivalent_salary = formatted;
      const p = document.createElement("p");
      p.innerHTML = `The equivalent salary for ${selectedRate} is {equivalent_salary} ${selected}s`;
      p.style = "text-align: center; color: white;";
      equivSalaryContainer.appendChild(p);
    });
  }