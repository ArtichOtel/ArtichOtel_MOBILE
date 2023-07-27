import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'

import { CriteriaCtx } from "../../utils/context";
import {addDays} from "../../utils/dates";

import DatesBottomSheetStyle from '../../style/DatesBottomSheetStyle';



function DatePickerBottomSheetContentAndroid(props: any): JSX.Element {

  // CONTEXTS
  const { criteria, setCriteria } = useContext(CriteriaCtx);

  // internal states
  const [visibleDatePicker, setVisibleDatePicker] = useState<"start"|"end"|null>(null)

  const today = new Date()
  // not booking after 18h00 => first possible booking day become next day
  const firstPossibleDay = today.getHours() < 18 ? today : addDays(today, 1)

  function userSelectStart(selectedDate):void {
    if (criteria.endDate && criteria.endDate > criteria.start) {
      setCriteria({ ...criteria, startDate: selectedDate })
    } else {
      setCriteria({ ...criteria, startDate: selectedDate, endDate: addDays(selectedDate, 1) })
    }
  }
  function userSelectEnd(selectedDate):void {
    if (criteria.startDate && criteria.endDate > criteria.start) {
      setCriteria({ ...criteria, endDate: selectedDate })
    } else {
      setCriteria({ ...criteria, startDate: addDays(selectedDate, -1), endDate: selectedDate })
    }
  }


  return (
    <>
      <Text style={DatesBottomSheetStyle.textTitle}>Choisissez vos dates</Text>

      <View style={DatesBottomSheetStyle.container}>

        <View style={DatesBottomSheetStyle.dateContainer}>

          <TouchableOpacity onPress={() => setVisibleDatePicker("start")}>
            <Text style={DatesBottomSheetStyle.dateTitle}>Arrivée</Text>
          </TouchableOpacity>

          {visibleDatePicker === "start" &&
            <DateTimePicker
              value={criteria.startDate||firstPossibleDay}
              mode={'date'}
              is24Hour={true}
              onChange={(_, selectedDate) => {
                setVisibleDatePicker(null)
                userSelectStart(selectedDate)
              }}
              minimumDate={firstPossibleDay}
            />
          }
        </View>

        <View style={DatesBottomSheetStyle.dateContainer}>

          <TouchableOpacity onPress={() => setVisibleDatePicker("end")}>
            <Text style={DatesBottomSheetStyle.dateTitle}>Départ</Text>
          </TouchableOpacity>
          
          {visibleDatePicker === "end" &&
            <DateTimePicker
              value={criteria.endDate||addDays(firstPossibleDay, 1)}
              mode='date'
              is24Hour={true}
              onChange={(_, selectedDate) => {
                setVisibleDatePicker(null)
                userSelectEnd(selectedDate)
              }}
              minimumDate={criteria.startDate ? addDays(criteria.startDate, 1) : addDays(firstPossibleDay, 1)}
            />
          }
        </View>
      </View>
    </>
  );
}

export default DatePickerBottomSheetContentAndroid;
