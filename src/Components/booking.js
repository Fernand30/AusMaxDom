import { StackNavigator } from "react-navigation";
import Booking1 from "./booking/booking1";
import Booking2 from "./booking/booking2";

const navigator = StackNavigator({
  booking1: {
    screen: Booking1
  },
  booking2: {
    screen: Booking2
  }
});

export default navigator;

