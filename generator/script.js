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
    //console.log(data);
    return data;
    data.departures.forEach((dep) => {
      console.log(dep.last_stop.name);
    });
  } catch (e) {
    console.error(e);
    alert("error while loading!");
  }
}
async function loadTrip(tripId) {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQyMywiaWF0IjoxNzY2MzUzNjQ1LCJleHAiOjExNzY2MzUzNjQ1LCJpc3MiOiJnb2xlbWlvIiwianRpIjoiNDVhMWFjNzEtMGRmNS00MDllLTk1YzUtZjEwZGZiZTE4NTdkIn0.0Ic_GmY_l4-u0YkR8UCnJeafLfTczz6pub9kuy-BnLA";
  const res = await fetch(
    `https://api.golemio.cz/v2/pid-gtfs/trips?trip_id=${tripId}`,
    {
      headers: { "x-access-token": API_KEY },
    }
  );
  return res.json();
}

function pos() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (p) => resolve([p.coords.latitude, p.coords.longitude]),
      (err) => reject(err)
    );
  });
}

// Převod Δlat/Δlon na metry pro přesnější vzdálenost
function dist(lat1, lon1, lat2, lon2) {
  const R = 6371000; // poloměr Země v metrech
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // vzdálenost v metrech
}

async function findCloseStops() {
  try {
    const text = await fetch("./../assets/stops.txt").then((r) => r.text());
    const stops = text
      .split(/\r?\n/)
      .slice(1)
      .map((l) => l.split(","))
      .filter(
        (l) =>
          l.length >= 4 && !isNaN(parseFloat(l[2])) && !isNaN(parseFloat(l[3]))
      );

    const loc = await pos();
    console.log("Moje pozice:", loc);

    let lowestDist = Infinity;
    let nearestStop = null;
    stops.forEach((stop) => {
      const d = dist(parseFloat(stop[2]), parseFloat(stop[3]), loc[0], loc[1]);
      if (d < lowestDist) {
        lowestDist = d;
        nearestStop = stop[0];
      }
    });

    console.log(
      "Nejbližší zastávka:",
      nearestStop,
      "vzdálenost v metrech:",
      lowestDist
    );
    return nearestStop;
  } catch (err) {
    console.error("Chyba při hledání zastávek:", err);
  }
}
function timeUntilDep(depTime) {
  const now = new Date();
  depTime = new Date(depTime);
  return depTime.getTime() - now.getTime();
}
async function getClosestStopDeps() {
  stop_id = await findCloseStops();
  let dep = await loadDepartures(stop_id);
  let i = 0;
  while (true) {
    if (
      4 <
      timeUntilDep(dep.departures[i].arrival_timestamp.predicted) / 60000 <
      30
    ) {
      console.log(
        `Byl vybrán spoj linky ${dep.departures[i].route.short_name} do ${dep.departures[i].trip.headsign} s odjezdem v ${dep.departures[i].departure_timestamp.predicted}.`
      );
      break;
    }
  }
  console.log("nbdbfhdsfbl");
  console.log(dep.departures[0]);
  console.log(
    `${timeUntilDep(dep.departures[0].arrival_timestamp.predicted) / 60000} min`
  );
}
window.onload = () => {
  getClosestStopDeps();
};
