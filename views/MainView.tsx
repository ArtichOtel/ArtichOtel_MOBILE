import { Alert, Button, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
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

export default function MainView(props: MainViewProps): JSX.Element {
  const { navigation } = props;
  const [data, setData] = useState([]);
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

  // const fetchHero = async () => {
  //   try {
  //     const response = await axios.get("http://localhost/api/hero");
  //     console.log("Response : ", response);
  //     const data = response.data;
  //     //setData(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error, "Error data : ", data);
  //   }
  // };

  // useEffect(() => {
  //   fetchHero();
  // }, []);

  return (
    <View style={[baseStyle.container, mainStyle.container]}>
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
      <MainMenu navigation={navigation} />
    </View>
  );
}