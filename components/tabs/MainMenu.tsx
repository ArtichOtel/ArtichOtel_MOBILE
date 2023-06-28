import {TouchableHighlight, View} from 'react-native';
import baseStyle from '../../style/baseStyle';
import mainMenuStyle from "../../style/mainMenuStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faUser, faSuitcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function MainMenu({navigation}): JSX.Element {
    return (
        <View style={mainMenuStyle.container}>
            <TouchableHighlight onPress={() => navigation.navigate('Main')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={50} style={mainMenuStyle.items} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => alert('loupe')}>
                <FontAwesomeIcon icon={faSuitcase} size={50} style={mainMenuStyle.items} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('Connection')}>
                <FontAwesomeIcon icon={faUser} size={50} style={mainMenuStyle.items} />
            </TouchableHighlight>
        </View>
    );
}