import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import NumberOfPeopleBottomSheetStyle from '../../style/NumberOfPeopleBottomSheetStyle';
import { CriteriaCtx } from '../../utils/context';


function NumberOfPeopleBottomSheetContent(props: any): JSX.Element {
  const { criteria, setCriteria } = React.useContext(CriteriaCtx);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(criteria.peopleNbr);

  const decrementNumberOfPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(numberOfPeople - 1);
    }
  };

  const incrementNumberOfPeople = () => {
    if (numberOfPeople < 3) {
      setNumberOfPeople(numberOfPeople + 1);
    }
  };

  useEffect(() => {
    setCriteria({
      ...criteria,
      peopleNbr: numberOfPeople
    })
  }, [numberOfPeople]);

  return (
    <View style={NumberOfPeopleBottomSheetStyle.container}>
      <Text style={[NumberOfPeopleBottomSheetStyle.textTitle]}>Indiquez le nombre de personnes</Text>
      <View style={[NumberOfPeopleBottomSheetStyle.alignContent]}>
        <TouchableOpacity onPress={decrementNumberOfPeople}>
          <FontAwesomeIcon icon={faMinus} size={40} />
        </TouchableOpacity>
        <Text style={[NumberOfPeopleBottomSheetStyle.textTitle, NumberOfPeopleBottomSheetStyle.textBold]}>
          {numberOfPeople}
        </Text>
        <TouchableOpacity onPress={incrementNumberOfPeople}>
          <FontAwesomeIcon icon={faPlus} size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NumberOfPeopleBottomSheetContent;