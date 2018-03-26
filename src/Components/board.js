import { StackNavigator } from "react-navigation";
import Board1 from "./board/board1";
import Board2 from "./board/board2";

const navigator = StackNavigator({
  board1: {
    screen: Board1
  },
  board2: {
    screen: Board2
  }
});

export default navigator;

