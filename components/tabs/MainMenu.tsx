import {TouchableWithoutFeedback, View} from 'react-native';
import baseStyle from '../../style/baseStyle';
import mainMenuStyle from "../../style/mainMenuStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faUser, faSuitcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function MainMenu(props: any): JSX.Element {
    return (
        <View style={mainMenuStyle.container}>
            <TouchableWithoutFeedback onPress={() => alert('loupe')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={50} style={mainMenuStyle.items} />
            </TouchableWithoutFeedback>
            <FontAwesomeIcon icon={faSuitcase} size={50} style={mainMenuStyle.items} />
            <FontAwesomeIcon icon={faUser} size={50} style={mainMenuStyle.items} />
        </View>
    );
}