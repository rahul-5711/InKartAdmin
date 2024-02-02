/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import colors from "../../common/colors";

const style = (width,height)=> 
StyleSheet.create({
    buttonTouch:{
        alignSelf:'center',
        width: width ,
        height: width * 0.15,
        padding:15,
        borderRadius:30,
        backgroundColor:colors.primaryGreen,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
    },
    buttonText: {
        fontFamily:'Lato-Bold',
        fontSize:18,
        color:colors.white
    }
}) 

export default style;