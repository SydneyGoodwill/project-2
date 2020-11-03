const settings = {
  async: true,
  crossDomain: true,
  url: "https://rapidapi.p.rapidapi.com/rest/v1/all",
  method: "GET",
  headers: {
    "x-rapidapi-key": "58227b4c01msh31c608e79f4eccep1702fajsn305d3ba7aa2e",
    "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
  },
};

$.ajax(settings).done((response) => {
  console.log(response);
});
