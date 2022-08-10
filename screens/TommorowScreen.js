import { View, Text, Button } from 'react-native';

const TommorowScreen = ({ navigation }) => {
  return (
    <View>
      <Text>TommorowScreen</Text>
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default TommorowScreen;