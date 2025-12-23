import { registerRootComponent } from "expo";

import App from "./App";
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
openMoovitRoute();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
