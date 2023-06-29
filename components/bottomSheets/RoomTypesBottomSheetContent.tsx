import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
// @ts-ignore
import { API_URL } from "@env";

type RoomTypes = {
  title: {
    fr_FR: string,
    en_EN: string,
  }
};


function RoomTypesBottomSheetContent(props: any): JSX.Element {

  const [data, setData] = useState<RoomTypes[] | null>([]);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get(API_URL + "room-types");
      const data = response.data[0];
      console.log("fetchRoomTypes : ", data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <>
      <Text>salutt</Text>
    </>
  );
}

export default RoomTypesBottomSheetContent;