// import { axios } from "./node_modules/axios/dist/axios";

const dropBtn = document.getElementById("drop-btn");
const dropIcon = document.querySelector(".drop-btn span");
const dropDown = document.querySelector(".dropdown");
const countries = document.querySelector(".countries");
const search = document.getElementById("search");
const form = document.getElementById("form");
const dropDownLi = document.querySelectorAll(".dropdown-li");
const dropul = document.querySelector(".dropdown-ul");

dropBtn.addEventListener("click", () => {
  dropDown.classList.toggle("active");
  dropIcon.classList.toggle("rotate");
});

// let Country;
let search_term = "";
let dropDownValue = "";

const getCountries = () => {
  try {
    axios
      .get(
        `https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital`
      )
      .then(async (res) => {
        let Country = await res.data;

        const filteredCountries = Country.filter((country) => {
          const FilterRegion = country.region
            .toLowerCase()
            .includes(dropDownValue.toLowerCase());
          const filterName = country.name.common
            .toLowerCase()
            .includes(search_term.toLowerCase());

          return filterName && FilterRegion;
        });
        countries.innerHTML = "";
        filteredCountries.map((data, i) => {
          const {
            name: { common },
            population,
            region,
            capital,
            flags: { png, alt },
          } = data;

          let d = document.createElement("div");

          d.innerHTML = `
          <div class="country">
              <figure class="flag">
                <img src=${png} alt="${alt}" />
                <figcaption>
                  <h2>${common}</h2>
                  <p>
                    <span>Population:</span>
                    <span>${population}</span>
                  </p>
                  <p>
                    <span>Region:</span>
                    <span>${region}</span>
                  </p>
                  <p>
                    <span>Capital:</span>
                    <span>${capital}</span>
                  </p>
                </figcaption>
              </figure>
              </div>
       `;
          countries.appendChild(d);
        });
      })
      .catch((err) => {
        const error = document.createElement("div");
        error.innerHTML = `"Error fetching countries:", ${err}`;
        document.body.appendChild(error);
        console.log(`Error ${err}`);
      });
  } catch (error) {
    const err = document.createElement("div");
    err.innerHTML = `"Error fetching countries:", ${error}`;
    document.body.appendChild(err);
  }
};

getCountries();

function FilterRegion() {
  axios
    .get(`https://restcountries.com/v3.1/all?fields=region`)
    .then(async (res) => {
      let regionFilter = await res.data;

      let a = [...new Set(regionFilter.map((item) => item.region))];
      a.map((item) => {
        let li = document.createElement("li");
        li.className = "dropdown-li";
        li.innerText = item;
        // ul.innerHTML = region;
        dropul.appendChild(li);
      });
    });
}

FilterRegion();

dropul.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-li")) {
    dropDownValue = e.target.innerText.toLowerCase();
  }
  if (e.target.innerText === "All") {
    dropDownValue = "";
  }
  getCountries();
});
search.addEventListener("input", (e) => {
  search_term = e.target.value;
  getCountries();
});
