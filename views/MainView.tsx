import { Text, View } from 'react-native';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import MainMenu from "../components/tabs/MainMenu";

export default function MainView(props: any): JSX.Element { 
  return (
    <View style={[baseStyle.container, mainStyle.container]}>
      <Text style={baseStyle.text}>Hello World!</Text>
        <MainMenu />
    </View>
  );
 }