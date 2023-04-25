fetch("https://restcountries.com/v3.1/region/europe")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      document.getElementById(
        "Ul-Capitals"
      ).innerHTML += `<li>${country.capital[0]}`;
    });
  });
