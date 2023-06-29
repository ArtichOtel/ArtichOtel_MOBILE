import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import RoomTypesBottomSheetStyle from "../../style/RoomTypesBottomSheetStyle";
import Checkbox from "expo-checkbox";

type RoomTypes = {
  title: {
    fr_FR: string,
    en_EN: string,
  }
};


function RoomTypesBottomSheetContent(props: any): JSX.Element {

  const [data, setData] = useState<RoomTypes[] | null>([]);
  const [isChecked, setChecked] = useState<number>(0);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get("http://192.168.137.1/api/room-types");
      const data = response.data;
      //console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const roomTypes = data.map((roomType, index) => {
    return (
      <View style={RoomTypesBottomSheetStyle.alignContent}>
        <Checkbox
          style={RoomTypesBottomSheetStyle.checkbox}
          value={isChecked === index}
          onValueChange={() => setChecked(index)}
          color={isChecked ? 'blue' : undefined}
        />
        <Text style={RoomTypesBottomSheetStyle.alignContent}>{roomType.title['fr_FR']}</Text>
      </View>
    )
  });

  console.log("Data : ", data)

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <View style={RoomTypesBottomSheetStyle.container}>
      <Text style={RoomTypesBottomSheetStyle.textTitle}>Indiquez le type de chambre</Text>
      {roomTypes}
    </View>
  );
}

export default RoomTypesBottomSheetContent;