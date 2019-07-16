package com.makingLunch;

import android.app.Application;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactApplication;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;

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
            new RNSecureKeyStorePackage(),
            new FBSDKPackage(mCallbackManager),
            new ReactNativePushNotificationPackage(),
            new RNGestureHandlerPackage(),
          new ReactNativeConfigPackage(),
          new RNGoogleSigninPackage() // <-- this needs to be in the list
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
