/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import colors from "../../common/colors";

const style = (width,height)=> 
StyleSheet.create({
    iconImage:{
        width:'15%',
        height:25,
        resizeMode:'contain',
        
    },
    adminText: {
        fontFamily:'Lato-Bold',
        fontSize:22,
        color:colors.black,
        textAlign:'center',
        marginBottom:20
    }
}) 

export default style;