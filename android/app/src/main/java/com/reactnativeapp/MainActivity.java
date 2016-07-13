package com.reactnativeapp;

import com.facebook.react.ReactActivity;
import com.remobile.toast.RCTToastPackage;
import com.lumin824.wechat.WechatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lumin824.screenshot.ScreenshotPackage;
import com.lumin824.qq.QQPackage;
import com.lumin824.nufrontwifi.NfWifiPackage;
import com.imagepicker.ImagePickerPackage;
import com.lumin824.chart.ChartPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    protected String getJSBundleFile() {
        //return BuildConfig.DEBUG ? super.getJSBundleFile(): CodePush.getBundleUrl();
        return super.getJSBundleFile();
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RCTToastPackage(),
            new WechatPackage(),
            new VectorIconsPackage(),
            new ScreenshotPackage(),
            new QQPackage(),
            new NfWifiPackage(),
            new ImagePickerPackage(),
            new ChartPackage(),
            new CodePush(BuildConfig.codePushDeploymentKey, this, BuildConfig.DEBUG)
        );
    }
}
