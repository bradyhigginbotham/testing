import React, {useState} from 'react';
import {ScrollView, View, StatusBar, Image} from 'react-native';
import PropTypes from 'prop-types';
import Input from '../../Components/Input';
import styles from './styles';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';

const PhoneNumberScreen = ({navigation, setUserPhoneNumber}) => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleChange = text => {
    setPhoneNumber(text);
  };

  const handlePress = () => {
    setUserPhoneNumber(phoneNumber);
    navigation.navigate('VerifyNumberScreen');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.snow} />
      <View style={styles.titleContainer}>
        <Image style={styles.Image} resizeMode="contain" source={images.phone} />
        <Text style={styles.title}>{'What’s your\nphone number?'}</Text>
      </View>
      <Input
        value={phoneNumber}
        onChangeText={e => handleChange(e)}
        label="Phone number"
        autoFocus
      />
      <Button title="Done" containerStyle={styles.button} onPress={() => handlePress()} />
    </ScrollView>
  );
};

PhoneNumberScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setUserPhoneNumber: PropTypes.func.isRequired,
};

export default PhoneNumberScreen;
