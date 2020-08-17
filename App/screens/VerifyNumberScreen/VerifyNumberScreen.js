import React, { useRef, useState } from 'react';
import { ScrollView, View, StatusBar, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import styles from './styles';
import colors from '../../Themes/Colors';

const VerifyNumberScreen = ({ navigation }) => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const [actualInut, setActualInut] = useState(0);

  const handleChangeText = (before, to, text) => {
    if (text === '' && actualInut !== 0) {
      before.current.focus();
      setActualInut(actualInut - 1);
    } else if (text !== '' && actualInut !== 3) {
      to.current.focus();
      setActualInut(actualInut + 1);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.snow} />
      <Text style={styles.title}>Enter Code</Text>
      <Text style={styles.text}>
        {'We sent a code to  (337) 456-7890.\nPlease enter the 4 digit code below.'}
      </Text>
      <View style={styles.verifyNumberContainer}>
        <TextInput
          autoFocus
          maxLength={1}
          ref={inputRef1}
          keyboardType="numeric"
          onChangeText={e => handleChangeText(null, inputRef2, e)}
          style={actualInut === 0 ? styles.inputSelected : styles.input}
        />
        <TextInput
          maxLength={1}
          ref={inputRef2}
          keyboardType="numeric"
          onChangeText={e => handleChangeText(inputRef1, inputRef3, e)}
          style={actualInut === 1 ? styles.inputSelected : styles.input}
        />
        <TextInput
          maxLength={1}
          ref={inputRef3}
          keyboardType="numeric"
          onChangeText={e => handleChangeText(inputRef2, inputRef4, e)}
          style={actualInut === 2 ? styles.inputSelected : styles.input}
        />
        <TextInput
          maxLength={1}
          ref={inputRef4}
          keyboardType="numeric"
          onChangeText={e => handleChangeText(inputRef3, null, e)}
          style={actualInut === 3 ? styles.inputSelected : styles.input}
        />
      </View>
      <Button
        title="Verify"
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('App')}
      />
    </ScrollView>
  );
};

VerifyNumberScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default VerifyNumberScreen;
