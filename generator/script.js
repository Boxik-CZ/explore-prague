async function loadDepartures(STOP_ID) {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQyMywiaWF0IjoxNzY2MzUzNjQ1LCJleHAiOjExNzY2MzUzNjQ1LCJpc3MiOiJnb2xlbWlvIiwianRpIjoiNDVhMWFjNzEtMGRmNS00MDllLTk1YzUtZjEwZGZiZTE4NTdkIn0.0Ic_GmY_l4-u0YkR8UCnJeafLfTczz6pub9kuy-BnLA";
  const url = `https://api.golemio.cz/v2/pid/departureboards?ids=${STOP_ID}&limit=10&preferredTimezone=Europe/Prague`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-access-token": API_KEY,
      },
    });

    const data = await response.json();
    console.log(data);

    data.departures.forEach((dep) => {
      console.log(dep.last_stop.name);
    });
  } catch (e) {
    console.error(e);
    alert("error while loading!");
  }
}
navigator.geolocation.getCurrentPosition((pos) => {
  console.log(pos);
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  console.log(`${lat}°N ${lon}°E`);
});
