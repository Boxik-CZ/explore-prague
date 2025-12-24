function getRoute(lat1, lon1, lat2, lon2) {
  var requestOptions = {
    method: "GET",
  };

  fetch(
    `https://api.geoapify.com/v1/routing?waypoints=${lat1}%2C${lon1}%7C${lat2}l%2C${lon2}&mode=transit&apiKey=023f7dc91674478c8225797b488e0ea1`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  return result;
}
