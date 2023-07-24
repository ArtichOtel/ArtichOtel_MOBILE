import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import RoomTypesBottomSheetStyle from "../../style/RoomTypesBottomSheetStyle";
import Checkbox from "expo-checkbox";
import { CriteriaCtx } from "../../utils/context";
// @ts-ignore
import { API_URL } from "@env";
import colors from "../../style/colors";

type RoomTypes = {
  title: {
    fr_FR: string,
    en_EN: string,
  }
};


function RoomTypesBottomSheetContent(props: any): JSX.Element {

  const { criteria, setCriteria } = React.useContext(CriteriaCtx);
  const [data, setData] = useState<RoomTypes[] | null>([]);
  const [isChecked, setChecked] = useState<number>(0);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get(API_URL + "room-types");
      const data = response.data;
      //console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  function setCriteriaToContext(index: number) {

    setChecked(index);

    setCriteria({
      ...criteria,
      roomTypes: data[index].title['fr_FR']
    })
  }

  const roomTypes = data.map((roomType, index) => {
    return (
      <View style={RoomTypesBottomSheetStyle.alignContent} key={index}>
        <Checkbox
          style={RoomTypesBottomSheetStyle.checkbox}
          value={isChecked === index}
          onValueChange={() => setCriteriaToContext(index)}
          color={isChecked ? colors.primary : colors.primary}
        />
        <Text style={RoomTypesBottomSheetStyle.alignContent}>{roomType.title['fr_FR']}</Text>
      </View>
    )
  });

  //console.log("RoomTypes : ", data)

  useEffect(() => {
    fetchRoomTypes();
  }, [CriteriaCtx]);

  return (
    <View style={RoomTypesBottomSheetStyle.container}>
      <Text style={RoomTypesBottomSheetStyle.textTitle}>Indiquez le type de chambre</Text>
      {roomTypes}
    </View>
  );
}

export default RoomTypesBottomSheetContent;