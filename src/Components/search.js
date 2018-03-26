import { StackNavigator } from "react-navigation";
import Search1 from "./search/search1";
import Search2 from "./search/search2";
import Search3 from "./search/search3";

const navigator = StackNavigator({
  search1: {
    screen: Search1
  },
  search2: {
    screen: Search2
  },
  search3: {
    screen: Search3
  }
});

export default navigator;

