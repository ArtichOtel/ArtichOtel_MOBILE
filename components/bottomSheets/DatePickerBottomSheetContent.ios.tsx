import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'

import { CriteriaCtx } from "../../utils/context";

import DatesBottomSheetStyle from '../../style/DatesBottomSheetStyle';
import { addDays } from "date-fns";

function DatePickerBottomSheetContentIOS(props: any): JSX.Element {

  // CONTEXTS
  const { criteria, setCriteria } = useContext(CriteriaCtx);

  const today = new Date()
  // not booking after 18h00 => first possible booking day become next day
  const firstPossibleDay = today.getHours() < 18 ? today : addDays(today, 1)

  function userSelectStart(selectedDate : Date):void {
    const newCriterias = {...criteria, startDate: selectedDate}

    if (
      !criteria.endDate
      || selectedDate.getTime() > criteria.endDate.getTime()
    ) newCriterias.endDate = addDays(selectedDate, 1)

    setCriteria(newCriterias)
  }

  function userSelectEnd(selectedDate):void {
    const newCriterias = {...criteria, endDate: selectedDate}

    if (!criteria.startDate) newCriterias.startDate = addDays(selectedDate, -1)
    
    setCriteria(newCriterias)
  }


  return (
    <>
      <Text style={DatesBottomSheetStyle.textTitle}>Choisissez vos dates</Text>

      <View style={DatesBottomSheetStyle.container}>

        <View style={DatesBottomSheetStyle.dateContainer}>
          <Text style={DatesBottomSheetStyle.dateTitle}>Arrivée</Text>

          <DateTimePicker
            value={criteria.startDate||firstPossibleDay}
            mode={'date'}
            is24Hour={true}
            onChange={(_, selectedDate) => {
              userSelectStart(selectedDate)
            }}
            minimumDate={firstPossibleDay}
          />
        </View>

        <View style={DatesBottomSheetStyle.dateContainer}>
          <Text style={DatesBottomSheetStyle.dateTitle}>Départ</Text>
          
          <DateTimePicker
            value={criteria.endDate||addDays(firstPossibleDay, 1)}
            mode='date'
            is24Hour={true}
            onChange={(_, selectedDate) => {
              userSelectEnd(selectedDate)
            }}
            minimumDate={criteria.startDate ? addDays(criteria.startDate, 1) : addDays(firstPossibleDay, 1)}
          />
        </View>
      </View>
    </>
  );
}

export default DatePickerBottomSheetContentIOS;
