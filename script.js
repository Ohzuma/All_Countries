const dropBtn = document.getElementById("drop-btn");
const dropIcon = document.querySelector(".drop-btn span");
const dropDown = document.querySelector(".dropdown");
const countries = document.querySelector(".countries");
const search = document.getElementById("search");
const form = document.getElementById("form");
const dropDownLi = document.querySelectorAll(".dropdown-li");
const dropul = document.querySelector(".dropdown-ul");
const country = document.getElementsByClassName("country");

dropBtn.addEventListener("click", () => {
  dropDown.classList.toggle("active");
  dropIcon.classList.toggle("rotate");
});

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
          let CountryDiv = document.createElement("div");
          let mainFig = document.createElement("figure");
          let countryFlag = document.createElement("img");
          let figCap = document.createElement("figcaption");
          let CountryName = document.createElement("h2");
          const countryPopulation = document.createElement("h5");
          const countryRegion = document.createElement("h5");
          const countryCapital = document.createElement("h5");

          CountryDiv.setAttribute("class", `country ${region}`);
          countryFlag.setAttribute("src", `${png}`);
          mainFig.setAttribute("class", "flag");

          CountryName.textContent = common;
          countryPopulation.innerHTML = `Population: <span>${population}</span>`;
          countryCapital.innerHTML = `Capital: <span>${capital}</span>`;
          countryRegion.innerHTML = `Region: <span>${region}</span>`;

          CountryDiv.appendChild(mainFig);
          mainFig.appendChild(countryFlag);
          mainFig.appendChild(figCap);
          figCap.appendChild(CountryName);
          figCap.appendChild(countryPopulation);
          figCap.appendChild(countryRegion);
          figCap.appendChild(countryCapital);
          countries.appendChild(CountryDiv);
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
function singleData() {
  axios.get(`https://restcountries.com/v3.1/all`).then(async (res) => {
    let countries = res.data;
    for (let i = 0; i < country.length; i++) {
      country[i].onclick = function () {
        let curr = this;
        document
          .querySelectorAll(".country")
          .forEach((e) => e.classList.add("remove"));
        let currName = curr.children[0].children[1].children[0].textContent;

        countries.forEach((coun) => {
          const {
            name: { common },
            population,
            region,
            capital,
            flags: { png, alt },
          } = coun;

          console.log(countries.nativeName);
          if (coun.name.common == currName) {
            document.title = common;
            const mainDiv = document.createElement("div");
            const backBotton = document.createElement("button");
            const colDiv = document.createElement("div");
            const imgDiv = document.createElement("div");
            const img = document.createElement("img");
            const detailedDiv = document.createElement("div");
            const detailCol = document.createElement("div");
            const border = document.createElement("div");
            const countryName = document.createElement("h2");
            const nativeName = document.createElement("h5");
            const population = document.createElement("h5");
            const subRegion = document.createElement("h5");
            const topLevel = document.createElement("h5");
            const currencies = document.createElement("h5");
            const language = document.createElement("h5");

            img.setAttribute("src", `${png}`);
            imgDiv.setAttribute("class", "img_div");
          }
        });
      };
    }
  });
}
singleData();
