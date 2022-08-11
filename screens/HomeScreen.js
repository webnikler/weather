import { View, Text, Button } from 'react-native';
import Icon, { IconName } from '../components/Icon';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title='Go to Tommorow'
        onPress={() => navigation.navigate('Tommorow')}
      />
      <Icon name={IconName.cloud} size={40} color='blue'/>
    </View>
  );
}

export default HomeScreen;