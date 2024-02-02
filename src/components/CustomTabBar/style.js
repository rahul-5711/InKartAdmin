/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import colors from "../../common/colors";

const style = (width,height)=> 
StyleSheet.create({
    buttonText1: {
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.white
    },
    buttonText: {
        fontFamily:'Lato-Bold',
        fontSize:16,
        color:colors.white
    },
});

export default style;