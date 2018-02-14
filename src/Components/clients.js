import { StackNavigator } from "react-navigation";
import Clients1 from "./clients/clients1";
import Clients2 from "./clients/clients2";

const navigator = StackNavigator({
  search1: {
    screen: Clients1
  },
  search2: {
    screen: Clients2
  }
});

export default navigator;

