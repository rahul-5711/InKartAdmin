/* eslint-disable prettier/prettier */
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropDown = props => {
  const {data, setData, prevDate} = props;
  const [activeSections, setActiveSections] = useState([]);
  const [selected, setSelected] = useState(
    prevDate ? prevDate.name : data[0].name,
  );

  useEffect(() => {
    if (data || prevDate) {
      setSelected(prevDate ? prevDate.name : data[0].name);
    }
  }, [data, prevDate]);

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const SECTIONS = [
    {id: 0, sectionData: prevDate ? prevDate.name : data[0].namee},
  ];

  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colors.black_level_2,
            fontSize: 16,
            fontFamily: 'Lato-Regular',
          }}>
          {selected}
        </Text>
        <AntDesign name="down" size={20} color={colors.black_level_2} />
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <FlatList
        data={data}
        style={{marginTop: 10}}
        renderItem={({item, index}) => {
          if (item === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setData(item);
                  setSelected(item.name);
                  setActiveSections([]);
                }}
                style={{
                  borderTopColor: colors.black_level_3,
                  borderTopWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontSize: 16,
                    fontFamily: 'Lato-Regular',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    );
  };

  return (
    <View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          padding: 15,
          borderColor: colors.primaryGreen,
          backgroundColor: colors.white_level_3,
        }}
      />
    </View>
  );
};

export default CustomDropDown;



// import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import Accordion from 'react-native-collapsible/Accordion';
// import colors from '../../common/colors';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const CustomDropDown = props => {
//   const {data, setData} = props;
//   const [activeSections, setActiveSections] = useState([]);
//   const [selected, setSelected] = useState(data[0].name);

//   const _updateSections = activeSections => {
//     setActiveSections(activeSections);
//   };

//   const SECTIONS = [{id: 0, sectionData: data[0].name}];

//   useEffect(() => {
//     if (data) {
//       setSelected(data[0].name);
//     }
//   }, [data]);

//   const _renderHeader = () => {
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <Text style={{color: colors.black_level_2, fontSize: 16}}>
//           {selected}
//         </Text>
//         <AntDesign name="down" size={24} color={colors.black} />
//       </View>
//     );
//   };

//   const _renderContent = () => {
//     return (
//       <FlatList
//         style={{marginTop: 10}}
//         data={data}
//         renderItem={({item, index}) => {
//           if (item === selected) {
//             return null;
//           } else {
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   setData(item.name);
//                   setSelected(item.name);
//                   setActiveSections([]);
//                 }}
//                 style={{
//                   borderTopColor: colors.black_level_3,
//                   borderTopWidth: StyleSheet.hairlineWidth,
//                   paddingVertical: 10,
//                 }}>
//                 <Text style={{color: colors.black_level_2, fontSize: 16}}>
//                   {' '}
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }
//         }}
//       />
//     );
//   };

//   return (
//     <View>
//       <Accordion
//         activeSections={activeSections}
//         sections={SECTIONS}
//         renderHeader={_renderHeader}
//         renderContent={_renderContent}
//         onChange={_updateSections}
//         underlayColor={'transparent'}
//         sectionContainerStyle={{
//           borderRadius: 8,
//           borderWidth: 1,
//           padding: 15,
//           borderColor: colors.primaryGreen,
//           backgroundColor: colors.white_level_3,
//         }}
//       />
//     </View>
//   );
// };

// export default CustomDropDown;
