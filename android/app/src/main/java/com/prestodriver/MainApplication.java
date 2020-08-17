package com.tryhampr.prestodriver;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.robinpowered.react.Intercom.IntercomPackage;
import io.intercom.android.sdk.Intercom;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.amazonaws.RNAWSCognitoPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.wix.interactable.Interactable;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.gettipsi.stripe.StripeReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new StripeReactPackage(),
            new IntercomPackage(),
            new RNCWebViewPackage(),
            new RNDeviceInfo(),
            new RNFusedLocationPackage(),
            new RNAWSCognitoPackage(),
            new ReanimatedPackage(),
            new RNCameraPackage(),
            new AsyncStoragePackage(),
            new RNPermissionsPackage(),
            new ReactNativeConfigPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new Interactable(),
            new SafeAreaContextPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new RNDateTimePickerPackage(),
            new RNGooglePlacesPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    
    if(BuildConfig.APPLICATION_ID == "com.tryhampr.prestodriver.dev") {
       Intercom.initialize(this, "android_sdk-13b9580ccd77a009542b1c34c7ff20aba818e71c", "fvg9h1v4");
    } else {
      Intercom.initialize(this, "android_sdk-d77bf80c641dfe59d26b04f16a36c04b0f5d3b6a", "dgsxxx8v");
    }

    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

   /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.rndiffapp.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
