import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faCalendar, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import buttonStyle from '../style/buttonStyle';
import React, { useState, useEffect } from 'react';
import MainMenu from '../components/tabs/MainMenu';
import { useCallback, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheetBase, { BottomSheetRefProps } from '../components/BottomSheetBase';
import { SCREEN_HEIGHT } from '../utils/dimension';
import axios from 'axios';

type MainViewProps = {
  navigation: any,
};

type Hero = {
  url_image: string,
};

export default function MainView(props: MainViewProps): JSX.Element {
  const ref = useRef<BottomSheetRefProps>(null)
  const onPress = useCallback((height: number) => {
    ref?.current?.scrollTo(height)
  }, [])
  const BottomSheetBaseHeight = -SCREEN_HEIGHT / 3
  const { navigation } = props;
  const [data, setData] = useState<Hero[] | null>([]);
  const [image, setImage] = useState<string | null>(null);

  // fetchHero section
  const fetchHero = async () => {
    try {
      const response = await axios.get("http://192.168.137.1/api/hero");
      const data = response.data[0];
      //console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setImage(data[0].url_image);
      console.log("Image : ", data[0].url_image);
    }
  }, [data]);

  // fetch

  return (
    <GestureHandlerRootView style={[baseStyle.view]}>
      <ImageBackground source={{ uri: image }} resizeMode='cover' style={baseStyle.view}>
        <View>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light, mainStyle.first]}
          >
            <FontAwesomeIcon icon={faBed} size={40} style={buttonStyle.light} />
            <Text style={buttonStyle.light}>Type de chambres</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light]}
          >
            <FontAwesomeIcon icon={faCalendar} size={40} style={buttonStyle.light} />
            <Text style={buttonStyle.light}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light]}
          >
            <FontAwesomeIcon icon={faUserGroup} size={40} style={buttonStyle.light} />
            <Text style={[buttonStyle.light,]}>Nombre de personnes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[baseStyle.btn, buttonStyle.search]}
          >
            <Text style={[buttonStyle.search, buttonStyle.textDark]}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground >

      <MainMenu navigation={navigation} />
    </GestureHandlerRootView >
  );
}

