import { Text, View, TouchableOpacity, ImageBackground, StatusBar, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faCalendar, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import buttonStyle from '../style/buttonStyle';
import React, { useState, useEffect } from 'react';
import MainMenu from '../components/tabs/MainMenu';
import { useCallback, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheetBase, { BottomSheetRefProps } from '../components/bottomSheets/BottomSheetBase';
import { SCREEN_HEIGHT } from '../utils/dimension';
import axios from 'axios';
import RoomTypesBottomSheetContent from '../components/bottomSheets/RoomTypesBottomSheetContent';
import NumberOfPeopleBottomSheetContent from '../components/bottomSheets/NumberOfPeopleBottomSheetContent';
import DatePickerBottomSheetContentIOS from '../components/bottomSheets/DatePickerBottomSheetContent.ios';
import DatePickerBottomSheetContentAndroid from '../components/bottomSheets/DatePickerBottomSheetContent.android';
// @ts-ignore
import { API_URL } from '@env';
import { CriteriaCtx } from '../utils/context';

type MainViewProps = {
  navigation: any,
};

type Hero = {
  url_image: string,
};

export default function MainView(props: MainViewProps): JSX.Element {

  const { navigation } = props;
  const { criteria } = React.useContext(CriteriaCtx);
  const [heroData, setHeroData] = useState<Hero[] | null>([]);
  const [image, setImage] = useState<string | null>(null);


  const baseBottomSheetHeight = (-SCREEN_HEIGHT +
    mainStyle.first.marginTop +
    baseStyle.btn.height +
    (mainStyle.alignBtn.gap / 2)
  )
  const BottomSheetHeightSeperation = (
    mainStyle.alignBtn.gap +
    mainStyle.alignBtn.padding +
    baseStyle.btn.padding +
    baseStyle.btn.height
  )
  const allRefs = {
    refRoomsTypes: useRef<BottomSheetRefProps>(null),
    refDates: useRef<BottomSheetRefProps>(null),
    refPeopleNbr: useRef<BottomSheetRefProps>(null)
  }

  const onPress = useCallback((ref: React.MutableRefObject<BottomSheetRefProps>, height: number) => {
    Object.values(allRefs).forEach((refObj) => {
      const isActive = refObj.current.isActive()
      if (isActive && refObj != ref) {
        refObj?.current?.scrollTo(0)
      }
    })
    const isActive = ref?.current?.isActive()
    ref?.current?.scrollTo(isActive ? 0 : height)
  }, [])

  // fetchHero section
  const fetchHero = async () => {
    try {
      const response = await axios.get(API_URL + "hero");
      const data = response.data[0];
      //console.log(data);
      setHeroData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchReservations = async () => {

    if (criteria.endDate && criteria.startDate && criteria.peopleNbr > 0 && criteria.roomType) {
      try {
        let result;
        const requestURL = new URL(
            `/search?type=1&startDate=${criteria.startDate}&endDate=${criteria.endDate}`, API_URL)

        const response = await axios.get(requestURL.href)
        result = response.data
        // console.log('searchReservations data recup: ', result)

        navigation.navigate('Room', { searchReservationsResult: result })
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log(criteria)
    }
  }

  useEffect(() => {
    fetchHero();
  }, [API_URL]);

  useEffect(() => {
    if (heroData.length > 0) {
      setImage(heroData[0].url_image);
      //console.log("Image : ", data[0].url_image);
    }
  }, [heroData]);

  // fetch

  return (
    <ImageBackground source={{ uri: image }} resizeMode='cover' style={baseStyle.view}>
      <StatusBar
        barStyle={'light-content'}
      />
      <GestureHandlerRootView style={[baseStyle.container, baseStyle.heroContainer, mainStyle.container]}>
        <View>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light, mainStyle.first]}
            onPress={() => onPress(allRefs.refRoomsTypes, baseBottomSheetHeight)}
          >
            <FontAwesomeIcon icon={faBed} size={40} style={buttonStyle.light} />
            <Text style={baseStyle.textDark}>{criteria.roomType ? criteria.roomType : "Type de chambre" }</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light]}
            onPress={() => onPress(allRefs.refDates, baseBottomSheetHeight + BottomSheetHeightSeperation)}
          >
            <FontAwesomeIcon icon={faCalendar} size={40} style={buttonStyle.light} />
            <Text style={baseStyle.textDark}>
              {!criteria.startDate && !criteria.endDate
                  ? 'Dates de séjour'
                  : criteria.startDate?.toDateString()+' - '+criteria.endDate?.toDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light]}
            onPress={() => onPress(allRefs.refPeopleNbr, baseBottomSheetHeight + BottomSheetHeightSeperation * 2)}
          >
            <FontAwesomeIcon icon={faUserGroup} size={40} style={buttonStyle.light} />
            <Text style={baseStyle.textDark}>{criteria.peopleNbr ? criteria.peopleNbr : "Nombre de personnes"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[baseStyle.btn, buttonStyle.search]}
            onPress={async () => await searchReservations()}
          >
            <Text style={[buttonStyle.search, baseStyle.textLight]}>Rechercher</Text>
          </TouchableOpacity>

        </View>
        <BottomSheetBase
          ref={allRefs.refRoomsTypes}
          height={baseBottomSheetHeight}
          content={<RoomTypesBottomSheetContent />}
        />
        <BottomSheetBase
          ref={allRefs.refDates}
          height={baseBottomSheetHeight + BottomSheetHeightSeperation}
          content={Platform.OS === 'ios'
            ? <DatePickerBottomSheetContentIOS />
            : <DatePickerBottomSheetContentAndroid />
          }
        />
        <BottomSheetBase
          ref={allRefs.refPeopleNbr}
          height={baseBottomSheetHeight + BottomSheetHeightSeperation * 2}
          content={<NumberOfPeopleBottomSheetContent />}
        />
        <MainMenu navigation={navigation} />
      </GestureHandlerRootView >
    </ImageBackground >
  );
}




