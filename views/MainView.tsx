import { Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
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

  const { criteria } = React.useContext(CriteriaCtx);
  const BottomSheetBaseHeight = -SCREEN_HEIGHT / 3
  const { navigation } = props;
  const [data, setData] = useState<Hero[] | null>([]);
  const [image, setImage] = useState<string | null>(null);
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
  //const [imageUrl, setImageUrl] = useState<string | null>(null);

  // fetchHero section
  const fetchHero = async () => {
    try {
      const response = await axios.get(API_URL + "hero");
      const data = response.data[0];
      //console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHero();
  }, [API_URL]);

  useEffect(() => {
    if (data.length > 0) {
      setImage(data[0].url_image);
      //console.log("Image : ", data[0].url_image);
    }
  }, [data, CriteriaCtx]);

  // fetch

  return (
    <ImageBackground source={{ uri: image }} resizeMode='cover' style={baseStyle.view}>
      <StatusBar
        barStyle={'light-content'}
      />
      <GestureHandlerRootView style={[baseStyle.container, mainStyle.container]}>
        <View>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light, mainStyle.first]}
            onPress={() => onPress(allRefs.refRoomsTypes, BottomSheetBaseHeight)}
          >
            <FontAwesomeIcon icon={faBed} size={40} style={buttonStyle.light} />
            <Text style={baseStyle.textDark}>{criteria.roomTypes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light]}
            onPress={() => onPress(allRefs.refDates, BottomSheetBaseHeight)}
          >
            <FontAwesomeIcon icon={faCalendar} size={40} style={buttonStyle.light} />
            <Text style={baseStyle.textDark}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light]}
            onPress={() => onPress(allRefs.refPeopleNbr, BottomSheetBaseHeight)}
          >
            <FontAwesomeIcon icon={faUserGroup} size={40} style={buttonStyle.light} />
            <Text style={baseStyle.textDark}>{criteria.peopleNbr ? criteria.peopleNbr : "Nombre de personnes"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[baseStyle.btn, buttonStyle.search]}
          >
            <Text style={[buttonStyle.search, baseStyle.textLight]}>Rechercher</Text>
          </TouchableOpacity>

        </View>
        <BottomSheetBase
          ref={allRefs.refRoomsTypes}
          height={BottomSheetBaseHeight}
          content={<RoomTypesBottomSheetContent />}
        />
        <BottomSheetBase
          ref={allRefs.refDates}
          height={BottomSheetBaseHeight}
          content={<Text>Dates</Text>}
        />
        <BottomSheetBase
          ref={allRefs.refPeopleNbr}
          height={BottomSheetBaseHeight}
          content={<NumberOfPeopleBottomSheetContent />}
        />
        <MainMenu navigation={navigation} />
      </GestureHandlerRootView >
    </ImageBackground >
  );
}




