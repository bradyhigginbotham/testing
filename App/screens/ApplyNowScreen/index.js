import React, { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../../Themes/Colors';

const ApplyNowScreen = () => {
  const webViewRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        startInLoadingState
        onLoadEnd={handleOnLoadEnd}
        style={isLoading && { flex: 0 }}
        containerStyle={{ justifyContent: 'center' }}
        source={{ uri: 'http://www.tryhampr.com/signup' }}
        renderLoading={() => (
          <ActivityIndicator size="large" color={colors.navi} />
        )}
      />
    </View>
  );
};

export default ApplyNowScreen;
