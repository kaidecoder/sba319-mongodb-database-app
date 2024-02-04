// display emoji flags and country codes
export function displayRates() {
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
        option.innerHTML = `${flag}  ${rate} | ${rates[rate]} `;
      } else {
        console.error(`Flag not found for currency code ${rate}`);
      }
  
      rateSelect.appendChild(option);
    }
  }