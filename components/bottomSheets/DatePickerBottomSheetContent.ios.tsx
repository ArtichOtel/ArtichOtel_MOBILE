import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from "react-native";
import { CriteriaCtx } from "../../utils/context";
import DateTimePicker from '@react-native-community/datetimepicker'
import DatesBottomSheetStyle from '../../style/DatesBottomSheetStyle';
import { formatISO } from 'date-fns'
import colors from '../../style/colors';
import {addDays} from "../../utils/dates";

function DatePickerBottomSheetContentIOS(props: any): JSX.Element {
  const { criteria, setCriteria } = useContext(CriteriaCtx);
  const today = new Date()
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(addDays(today, 1))


  useEffect(() => {

    if (startDate >= endDate) setEndDate(addDays(startDate, 1))

    setCriteria({
      ...criteria,
      startDate: startDate
    })
  }, [startDate]);

  useEffect(() => {

    if (startDate >= endDate) setStartDate(addDays(startDate, -1))

    setCriteria({
      ...criteria,
      endDate: endDate
    })
  }, [endDate]);

  return (
    <>
      <Text style={DatesBottomSheetStyle.textTitle}>Choisissez vos dates</Text>
      <View style={DatesBottomSheetStyle.container}>
        <View style={DatesBottomSheetStyle.dateContainer}>
          <Text style={DatesBottomSheetStyle.dateTitle}>Arrivée</Text>
          <DateTimePicker
            testID='startDate'
            value={startDate ? startDate : today}
            mode='date'
            accentColor={colors.primary}
            is24Hour={true}
            onChange={(_, selectedDate) => {
              setStartDate(selectedDate)
              if (!endDate) setEndDate(addDays(selectedDate, 1))
            }}
            minimumDate={today}
          />
        </View>
        <View style={DatesBottomSheetStyle.dateContainer}>
          <Text style={DatesBottomSheetStyle.dateTitle}>Départ</Text>
          <DateTimePicker
            testID='endDate'
            value={endDate}
            mode='date'
            accentColor={colors.primary}
            is24Hour={true}
            onChange={(_, selectedDate) => {
              setEndDate(selectedDate)
              if (!startDate) setStartDate(addDays(selectedDate, -1))
            }}
            minimumDate={addDays(startDate, 1)}
          />
        </View>
      </View>
    </>
  );
}

export default DatePickerBottomSheetContentIOS;
