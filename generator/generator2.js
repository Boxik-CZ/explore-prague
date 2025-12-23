import * as Linking from "expo-linking";

function openMoovitRoute() {
  const url =
    "moovit://directions?" +
    "orig_lat=49.9638236&orig_lon=14.0719964&" +
    "dest_lat=50.031475&dest_lon=14.3682919&" +
    "orig_name=Start&dest_name=Cil&" +
    "auto_run=true&partner_id=Explore-Prague";

  Linking.openURL(url);
}
