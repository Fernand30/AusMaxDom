import { StackNavigator } from "react-navigation";
import TabScreen from "../Components/tabScreen";
import Login from "../Components/login";
import SinIn from "../Components/signin";
import SignUp from "../Components/signup";

const navigator = StackNavigator({
  login: {
    screen: Login
  },
  tabScreen: {
    screen: TabScreen
  },
  signin: {
    screen: SinIn
  },
  signup: {
    screen: SignUp
  },
});

export default navigator;
