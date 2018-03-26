import { StackNavigator } from "react-navigation";
import Profile1 from "./profile/profile1";
import Profile2 from "./profile/profile2";

const navigator = StackNavigator({
  profile1: {
    screen: Profile1
  },
  profile2: {
    screen: Profile2
  }
});

export default navigator;

