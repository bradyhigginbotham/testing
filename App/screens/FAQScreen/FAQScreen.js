import React, { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../../Themes/Colors';

const FAQScreen = () => {
  const webViewRef = useRef(null);

  // get FAQ section
  const run = `
    const faq = document.getElementsByClassName('et_pb_section et_pb_section_5 laundry_section_6 et_pb_with_background et_section_regular')[0];
    faq.scrollIntoView();
    true;
  `;

  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoadEnd = () => {
    setIsLoading(false);
    webViewRef.current.injectJavaScript(run);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        startInLoadingState
        onLoadEnd={handleOnLoadEnd}
        style={isLoading && { flex: 0 }}
        containerStyle={{ justifyContent: 'center' }}
        source={{ uri: 'https://www.tryhampr.com/washers-2/' }}
        renderLoading={() => <ActivityIndicator size="large" color={colors.navi} />}
      />
    </View>
  );
};

export default FAQScreen;
