import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { StatusBar, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Constants = {
    MARGIN : responsiveWidth(1),
    FONT: responsiveFontSize(0.1),
    WIDTH : responsiveWidth(100),
    HEIGHT : responsiveHeight(100),
}

export default Constants;
