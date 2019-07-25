package com.makingLunch;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNGestureHandlerPackage(),
          new MapsPackage(),
          new RNSecureKeyStorePackage(),
          new ReactNativeConfigPackage(),
          new FBSDKPackage(mCallbackManager),
          new RNGoogleSigninPackage(),
          new ReactNativePushNotificationPackage(),
          new FastImageViewPackage()
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
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
