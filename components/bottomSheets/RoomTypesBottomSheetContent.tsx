import axios from "axios";
import React, { useState } from "react";
import { Text } from "react-native";

type RoomTypes = {
  title: {
    fr_FR: string,
    en_EN: string,
  }
};


function RoomTypesBottomSheetContent(props: any): JSX.Element {

  const [data, setData] = useState<RoomTypes[] | null>([]);

  const fetchHero = async () => {
    try {
      const response = await axios.get("http://192.168.137.1/api/hero");
      const data = response.data[0];
      //console.log(data);
      //setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text>salutt</Text>
    </>
  );
}

export default RoomTypesBottomSheetContent;