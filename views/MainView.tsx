import { Alert, Button, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faCalendar, faUserGroup, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import buttonStyle from '../style/buttonStyle';
import { useState } from 'react';

type props = {};

export default function MainView(props: any): JSX.Element {

  //const [data, setData] useState([]);

  const getHeroFromApi = async () => {
    return fetch('http://localhost/api/hero')
      .then(resp => console.log(resp.json()))
  };

  return (
    <View style={[baseStyle.container, mainStyle.container]}>
      <View>
        <TouchableOpacity style={[mainStyle.alignBtn]} onPress={getHeroFromApi}>
          <FontAwesomeIcon icon={faBed} size={30} style={buttonStyle.light} />
          <Text >Type de chambres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyle.alignBtn}>
          <FontAwesomeIcon icon={faCalendar} size={30} style={buttonStyle.light} />
          <Text >Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyle.alignBtn}>
          <FontAwesomeIcon icon={faUserGroup} size={30} style={buttonStyle.light} />
          <Text >Nombre de personnes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}