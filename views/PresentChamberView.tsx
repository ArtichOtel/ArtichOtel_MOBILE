import { Text, View, Image, TouchableOpacity } from 'react-native';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import presentChamberStyle from '../style/presentChamberStyle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faShower, faTelevision, faSmokingBan, faBellConcierge, faClock, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import colors from '../style/colors';

export default function PresentChamberView(props: any): JSX.Element {
    return (
        

      <View style={[baseStyle.container, mainStyle.container]}>
            <View style={[baseStyle.container, mainStyle.container, presentChamberStyle.box]}>
                <Text>X personnes </Text>
                <Text>29/06/2023  -  </Text>
                <Text>30/06/2023</Text>
            </View>

        <Image source={require('../assets/images/chambreHotel.jpg')} style={{width:300, height:100, borderColor:'black', borderWidth:1, borderRadius:10, marginBottom: 15}} />
        <Text style={[baseStyle.title, {fontSize: 30, alignItems:"flex-start", marginBottom: 5, textDecorationLine: 'underline'}]}>Chambre Standard</Text>

        <Text style={baseStyle.text}>Voici une chambre Standard pour maximum 3 personnes, avec des lits douillés, ainsi qu'un confort inégalable. Télé, service de chambre, douche et autres avantages vous attendent</Text>

        <View style={presentChamberStyle.arrivalHourContainer}>
            <FontAwesomeIcon icon={faClock} size={40} style={{marginRight: 15}} />
            <Text style={baseStyle.text}> Arrivée entre 13h00 et 18h00</Text>
        </View>

        <View style={presentChamberStyle.greatContainer}>
            <View style={presentChamberStyle.middleContainer}>
                <View style={presentChamberStyle.littleContainer} >
                    <FontAwesomeIcon icon={faShower} size={40} style={{marginRight: 15}}/>
                    <Text style={baseStyle.text} >Douche</Text>
                </View>
                <View style={presentChamberStyle.littleContainer} >
                    <FontAwesomeIcon icon={faBed} size={40} style={{marginRight: 15}}/>
                    <Text style={baseStyle.text} >Grand lit</Text>
                </View>
                <View style={presentChamberStyle.littleContainer} >
                    <FontAwesomeIcon icon={faSmokingBan} size={40} style={{marginRight: 15}}/>
                    <Text style={baseStyle.text} >Ne pas fumer</Text>
                </View>
            </View>
            <View style={presentChamberStyle.middleContainer}>
                <View style={presentChamberStyle.littleContainer} >
                    <FontAwesomeIcon icon={faTelevision} size={40} style={{marginRight: 15}}/>
                    <Text style={baseStyle.text} >Télévision</Text>
                </View>
                <View style={presentChamberStyle.littleContainer} >
                    <FontAwesomeIcon icon={faKitchenSet} size={40} style={{marginRight: 15}} />
                    <Text style={baseStyle.text} >Frigo et Cuisine</Text>
                </View>
                <View style={presentChamberStyle.littleContainer} >
                    <FontAwesomeIcon icon={faBellConcierge} size={40} style={{marginRight: 15}}/>
                    <Text style={baseStyle.text} >Service de Chambre</Text>
                </View>
            </View>
        </View>

        <View style={presentChamberStyle.littleContainer}>
            <TouchableOpacity style={presentChamberStyle.buttonPrice}><Text>200€</Text></TouchableOpacity>
            <TouchableOpacity style={presentChamberStyle.buttonValid}><Text>Selectionner</Text></TouchableOpacity>
        </View>
      </View>
    );
   }