import { Alert, Button, Text, View, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faCalendar, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import buttonStyle from '../style/buttonStyle';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainMenu from '../components/tabs/MainMenu';

type MainViewProps = {
  navigation: any,
};

type Hero = {
  title: string,
  url_image: string,
};

export default function MainView(props: MainViewProps): JSX.Element {
  const { navigation } = props;
  const [data, setData] = useState<Hero[] | null>([]);
  //const [imageUrl, setImageUrl] = useState<string | null>(null);

  // const getHeroFromApi = async () => {
  //   try {
  //     const response = await fetch('http://localhost/api/hero');
  //     const json = await response.json();
  //     const hero = json
  //     console.log(hero);
  //     //setData(hero);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getHeroFromApi();
  // }, []);

  const fetchHero = async () => {
    try {
      const response = await axios.get("http://192.168.137.1/api/hero");
      const data = response.data[0];
      console.log(data[0].url_image);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const image = { uri: data[0].url_image }
  console.log("image: ", image)

  return (
    <View style={[baseStyle.container, mainStyle.container]}>
      <ImageBackground source={image} resizeMode='cover' >
        <View>
          <TouchableOpacity style={[mainStyle.alignBtn, buttonStyle.light, baseStyle.btn]}>
            <FontAwesomeIcon icon={faBed} size={40} style={buttonStyle.light} />
            <Text style={buttonStyle.light}>Type de chambres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mainStyle.alignBtn, buttonStyle.light, baseStyle.btn]}>
            <FontAwesomeIcon icon={faCalendar} size={40} style={buttonStyle.light} />
            <Text style={buttonStyle.light}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mainStyle.alignBtn, buttonStyle.light, baseStyle.btn]}>
            <FontAwesomeIcon icon={faUserGroup} size={40} style={buttonStyle.light} />
            <Text style={buttonStyle.light}>Nombre de personnes</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <MainMenu navigation={navigation} />
    </View>
  );
}

const test = StyleSheet.create({
  image: {
    justifyContent: "center",
  }
});
