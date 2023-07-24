import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Platform, StyleSheet } from "react-native";
import { CriteriaCtx } from "../../utils/context";
import { set } from 'react-native-reanimated';

function DatePickerBottomSheetContent(props: any): JSX.Element {
  const { criteria, setCriteria } = useContext(CriteriaCtx);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setCriteria({
      ...criteria,
      date: date
    })
  }, [date]);

  return (
    <View>
      <Text>La date 😡😡😡😡 {date.toDateString()}</Text>
    </View>
  );
}

export default DatePickerBottomSheetContent;
