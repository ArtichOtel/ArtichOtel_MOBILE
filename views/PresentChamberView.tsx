import { Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faShower, faTelevision, faSmokingBan, faBellConcierge, faClock, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import presentChamberStyle from '../style/presentChamberStyle';
import ScrollView = Animated.ScrollView;


export default function PresentChamberView(props: any): JSX.Element {
    return (
      <View 
      style={baseStyle.container}
      >
            <View style={[baseStyle.container, presentChamberStyle.infoBox, presentChamberStyle.contentCenter]}>
                <Text>X personnes  -  </Text>
                <Text>29/06/2023  -  </Text>
                <Text>30/06/2023</Text>
            </View> 
        
            <ScrollView>
                <Image source={require('../assets/images/chambreHotel.jpg')} style={{width:300, height:100, borderColor:'black', borderWidth:1, borderRadius:10, marginBottom: 15}} />
                <Text style={[baseStyle.title, {fontSize: 30, alignItems:"flex-start", marginBottom: 5, textDecorationLine: 'underline'}]}>Chambre Standard</Text>

                <Text style={baseStyle.textTypo}>Voici une chambre Standard pour maximum 3 personnes, avec des lits douillés, ainsi qu'un confort inégalable. Télé, service de chambre, douche et autres avantages vous attendent</Text>

                <View style={[presentChamberStyle.arrivalHourContainer, presentChamberStyle.contentCenter]}>
                    <FontAwesomeIcon icon={faClock} size={40} style={{marginRight: 15}} />
                    <Text style={baseStyle.textTypo}> Arrivée entre 13h00 et 18h00</Text>
                </View>

                <View style={[presentChamberStyle.advantagesContainer, presentChamberStyle.contentCenter]}>
                    <View style={[presentChamberStyle.columnContainer, presentChamberStyle.contentCenter]}>
                        <View style={[presentChamberStyle.itemContainer, presentChamberStyle.contentCenter]}>
                            <FontAwesomeIcon icon={faShower} size={40} style={{marginRight: 15}}/>
                            <Text style={baseStyle.textTypo}>Douche</Text>
                        </View>
                        <View style={[presentChamberStyle.itemContainer, presentChamberStyle.contentCenter]} >
                            <FontAwesomeIcon icon={faBed} size={40} style={{marginRight: 15}}/>
                            <Text style={baseStyle.textTypo} >Grand lit</Text>
                        </View>
                        <View style={[presentChamberStyle.itemContainer, presentChamberStyle.contentCenter]} >
                            <FontAwesomeIcon icon={faSmokingBan} size={40} style={{marginRight: 10}}/>
                            <Text style={baseStyle.textTypo} >Ne pas fumer</Text>
                        </View>
                    </View>
                    <View style={[presentChamberStyle.columnContainer, presentChamberStyle.contentCenter]}>
                        <View style={presentChamberStyle.itemContainer} >
                            <FontAwesomeIcon icon={faTelevision} size={40} style={{marginRight: 15}}/>
                            <Text style={baseStyle.textTypo} >Télévision</Text>
                        </View>
                        <View style={[presentChamberStyle.itemContainer, presentChamberStyle.contentCenter]} >
                            <FontAwesomeIcon icon={faKitchenSet} size={40} style={{marginRight: 15}} />
                            <Text style={baseStyle.textTypo} >Frigo et Cuisine</Text>
                        </View>
                        <View style={[presentChamberStyle.itemContainer, presentChamberStyle.contentCenter]} >
                            <FontAwesomeIcon icon={faBellConcierge} size={40} style={{marginRight: 5}}/>
                            <Text style={baseStyle.textTypo} >Service Chambre</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        

        <View style={[presentChamberStyle.buttonBackgroundContainer, presentChamberStyle.contentCenter]}>
            <TouchableOpacity style={[presentChamberStyle.buttonPrice, presentChamberStyle.contentCenter]}><Text style={presentChamberStyle.buttonTextColor}>200€</Text></TouchableOpacity>
            <TouchableOpacity style={[presentChamberStyle.buttonValid, presentChamberStyle.contentCenter]}><Text style={presentChamberStyle.buttonTextColor}>Selectionner</Text></TouchableOpacity>
        </View>
      </View>
    );
   }