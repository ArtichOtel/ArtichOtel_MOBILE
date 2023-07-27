import { Text, View, TouchableOpacity, ImageBackground, StatusBar, Platform, Alert } from 'react-native';
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
import Animated from 'react-native-reanimated';

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
  const [criteriaError, setCriteriaError] = useState<string | null>(null)

  const [roomTypeHasChanged, setRoomTypeHasChanged] = useState(false)
  const [dateHasChanged, setdateHasChanged] = useState(false)
  const [peopleNbrHasChanged, setpeopleNbrHasChanged] = useState(false)

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
  const criteriaErrors = {
    roomType: "Veuillez choisir un type de chambre.",
    startDate: "Veuillez choisir une date d'arrivée.",
    endDate: "Veuillez choisir une date de départ.",
    peopleNbr: "Veuillez choisir un nombre de personnes."
  }
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
      setHeroData(data);
    } catch (error) {
      console.error(error);
    }
  };

  function animateValidation(key: string) {
    switch (key) {
      // If conditions are here to prevent re-setting the value
      // when the func pass into the useEffect associated to.
      // So, it prevents too much resource consumption from the app.
      case 'roomType':
        if (!roomTypeHasChanged) setRoomTypeHasChanged(true)
        break
      case 'startDate':
        if (!dateHasChanged) setdateHasChanged(true)
        break
      case 'endDate':
        if (!dateHasChanged) setdateHasChanged(true)
        break
      case 'peopleNbr':
        if (!peopleNbrHasChanged) setpeopleNbrHasChanged(true)
        break
      default:
        break
    }
  }

  function validateCriterias() {
    let validated = 0

    for (const [key, value] of Object.entries(criteria)) {
      if (value) {
        validated++
        animateValidation(key)
      }
      else setCriteriaError(criteriaErrors[`${key}`])
    }
    if (validated === Object.keys(criteriaErrors).length) setCriteriaError(null)
  }

  const searchReservations = async () => {
    if (!criteriaError) {
      try {
        let result;
        const requestURL = new URL(
          `/search?type=1&startDate=${criteria.startDate}&endDate=${criteria.endDate}`, API_URL)

        const response = await axios.get(requestURL.href)
        result = response.data
         //console.log('searchReservations data recup: ', result)

        if (result.length > 0) navigation.navigate('Room', { searchReservationsResult: result })
        else Alert.alert(
          'Aucune chambre disponible',
          'Veuillez changer la plage de dates de réservation.'
        )
      } catch (error) {
        console.error('MainView - searchReservations:', error)
      }
    } else {
      console.log('Main View - criteria:', criteria)
      Alert.alert('Critère non valide', criteriaError)
    }
  }

  useEffect(() => {
    validateCriterias()
  }, [criteria])

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
        <Animated.View>
          <TouchableOpacity
            style={[
              baseStyle.btn,
              mainStyle.alignBtn,
              buttonStyle.light,
              mainStyle.first,
              roomTypeHasChanged ? buttonStyle.validated : null
            ]}
            onPress={() => onPress(allRefs.refRoomsTypes, baseBottomSheetHeight)}
          >
            <FontAwesomeIcon icon={faBed} size={40} />
            <Text style={baseStyle.textDark}>{criteria.roomTitle ? criteria.roomTitle : "Type de chambre"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              baseStyle.btn,
              mainStyle.alignBtn,
              buttonStyle.light,
              dateHasChanged ? buttonStyle.validated : null
            ]}
            onPress={() => onPress(allRefs.refDates, baseBottomSheetHeight + BottomSheetHeightSeperation)}
          >
            <FontAwesomeIcon icon={faCalendar} size={40} />
            <Text style={baseStyle.textDark}>
              {!criteria.startDate && !criteria.endDate
                ? 'Dates de séjour'
                : criteria.startDate?.toDateString() + ' - ' + criteria.endDate?.toDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              baseStyle.btn,
              mainStyle.alignBtn,
              buttonStyle.light,
              peopleNbrHasChanged ? buttonStyle.validated : null
            ]}
            onPress={() => onPress(allRefs.refPeopleNbr, baseBottomSheetHeight + BottomSheetHeightSeperation * 2)}
          >
            <FontAwesomeIcon icon={faUserGroup} size={40} />
            <Text style={baseStyle.textDark}>{criteria.peopleNbr ? criteria.peopleNbr : "Nombre de personnes"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[baseStyle.btn, buttonStyle.search]}
            onPress={async () => await searchReservations()}
          >
            <Text style={[buttonStyle.search, baseStyle.textLight]}>Rechercher</Text>
          </TouchableOpacity>

        </Animated.View>
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




