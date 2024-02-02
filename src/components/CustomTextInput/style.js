/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import colors from "../../common/colors";

const style = (width,height)=> 
StyleSheet.create({
    text : {
        fontFamily: 'Lato-Regular',
        fontSize:16,
        color:colors.black
    }
}) 

export default style;