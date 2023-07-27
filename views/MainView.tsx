import { Text, View, TouchableOpacity, ImageBackground, StatusBar, Platform, Alert, Animated, Easing } from 'react-native';
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
import colors from '../style/colors';

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

  // Animations consts
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
  //const roomTypeAnim = useRef(new Animated.Value(0)).current
  //const dateAnim = useRef(new Animated.Value(0)).current
  //const peopleNbrAnim = useRef(new Animated.Value(0)).current
  const animFadeInOut = useRef(new Animated.Value(0)).current
  const [criteriaDiffs, setCriteriaDiffs] = useState({})

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

  const roomTypeAnim = Animated.timing(animFadeInOut, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.linear)
  }).start()//() => roomTypeAnim.setValue(0)) // Resets the value once the animation is in 'stop' state.
  const dateAnim = Animated.timing(animFadeInOut, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.linear)
  }).start()//() => roomTypeAnim.setValue(0)) // Resets the value once the animation is in 'stop' state.
  const peopleNbrAnim = Animated.timing(animFadeInOut, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.linear)
  }).start()//() => roomTypeAnim.setValue(0)) // Resets the value once the animation is in 'stop' state.

  function bgAnimatedStyle(animation: Animated.Value) {
    return {
      backgroundColor: animation.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [colors.secondary, colors.tertiary, colors.secondary],
      })
    }
  }
/*

  function animateValidation(key: string) {
    console.log('✔︎') // TODO : Delete
    switch (key) {
      case 'roomType':
        fadeInOut(roomTypeAnim)
        break
      case 'startDate':
        fadeInOut(dateAnim)
        break
      case 'endDate':
        fadeInOut(dateAnim)
        break
      case 'peopleNbr':
        fadeInOut(peopleNbrAnim)
        break
      default:
        break
    }
  }
*/

  function validateCriterias() {
    let validated = 0

    for (const [key, value] of Object.entries(criteria)) {
      // TODO : Delete logs
      console.log('key:', key, 'value:', value)
      console.log(`criteriaDiffs['${key}']`, criteriaDiffs[`${key}`])
      console.log('!==', value !== criteriaDiffs[`${key}`])
      if (value) {
        validated++
        if (value !== criteriaDiffs[`${key}`]) {
          animateValidation(key)
          setCriteriaDiffs({
            ...criteriaDiffs,
            [key]: value
          })
        }
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

  // useEffect(() => {
  //   validateCriterias()
  // }, [criteria])

  useEffect(() => {
    roomTypeAnim.start()
  }, [criteria.roomType])

  useEffect(() => {
    fadeInOut(dateAnim)
  }, [criteria.endDate, criteria.startDate])

  useEffect(() => {
    fadeInOut(peopleNbrAnim)
  }, [criteria.peopleNbr])

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
          <AnimatedTouchableOpacity
            style={[
              baseStyle.btn,
              mainStyle.alignBtn,
              buttonStyle.light,
              mainStyle.first,
              bgAnimatedStyle(roomTypeAnim)
            ]}
            onPress={() => onPress(allRefs.refRoomsTypes, baseBottomSheetHeight)}
          >
            <FontAwesomeIcon icon={faBed} size={40} />
            <Text style={baseStyle.textDark}>{criteria.roomTitle ? criteria.roomTitle : "Type de chambre"}</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            style={[
              baseStyle.btn,
              mainStyle.alignBtn,
              buttonStyle.light,
              bgAnimatedStyle(dateAnim)
            ]}
            onPress={() => onPress(allRefs.refDates, baseBottomSheetHeight + BottomSheetHeightSeperation)}
          >
            <FontAwesomeIcon icon={faCalendar} size={40} />
            <Text style={baseStyle.textDark}>
              {!criteria.startDate && !criteria.endDate
                ? 'Dates de séjour'
                : criteria.startDate?.toLocaleDateString() + ' - ' + criteria.endDate?.toLocaleDateString()
              }
            </Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            style={[
              baseStyle.btn,
              mainStyle.alignBtn,
              buttonStyle.light,
              bgAnimatedStyle(peopleNbrAnim)
            ]}
            onPress={() => onPress(allRefs.refPeopleNbr, baseBottomSheetHeight + BottomSheetHeightSeperation * 2)}
          >
            <FontAwesomeIcon icon={faUserGroup} size={40} />
            <Text style={baseStyle.textDark}>{criteria.peopleNbr ? criteria.peopleNbr : "Nombre de personnes"}</Text>
          </AnimatedTouchableOpacity>

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




