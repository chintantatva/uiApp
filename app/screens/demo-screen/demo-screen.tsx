import React, { FunctionComponent as Component, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { FaceBookSignInComponent } from "../../components/FaceBookSignInComponent";
import { GoogleSigninComponent } from '../../components/GoogleSigninComponent';
import { WebView } from 'react-native-webview';
import AzureAuth from 'react-native-azure-auth';
import { authorize, refresh, AuthConfiguration } from 'react-native-app-auth';
import InAppBrowser from 'react-native-inappbrowser-reborn'



const azureAuth = new AzureAuth({
  clientId: "e2a858cf-0b4e-4f7b-b284-a1de71ce2c9d"
});

export const AuthConfig: any = {
  clientId: "e2a858cf-0b4e-4f7b-b284-a1de71ce2c9d",
  redirectUrl: 'com.uiapp://com.uiapp/android/callback',
  scopes: [
    'openid',
    'offline_access',
    'profile',
    'User.Read',
    'Calendars.Read'
  ],
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  }
};





export const DemoScreen: Component = function DemoScreen() {
  const googleComponent = useRef(null);
  const facebookComponent = useRef(null);
  const [isOpenMyPeople, setisOpenMyPeople] = useState(false);




  //google
  // There are method avlible for signout, revokeAccess,getCurrentUser,isSignedIn and you can call method as following
  // googleComponent.current.signOut()


  //facebook
  // There are method avlible for logout and you can call method as following
  // facebookComponent.current.logout()

  async function onPressMic() {
    // try {
    //   let tokens = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read Mail.Read' })
    //   console.tron.log('to', tokens)
    //   Alert.alert('try')
    //   // this.setState({ accessToken: tokens.accessToken });
    //   let info = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: '/me' })
    //   // this.setState({ user: info.displayName, userId: tokens.userId })
    // } catch (error) {
    //   Alert.alert('catch')
    //   console.tron.log('e', error)
    //   console.warn(error)
    // }


    const result = await authorize(AuthConfig);
    console.tron.log('res', result)
    console.warn(result)
  }

  async function onPressMyPeopel() {
    try {
      const url = 'https://outlook.office.com/owa/?path=/people'
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, "abc", {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false
        }).then((response) => {
          if (
            response.type === 'success' &&
            response.url
          ) {
            // Linking.openURL(response.url)
          }
        })
        // const result = await InAppBrowser.open(url, {
        //   // iOS Properties
        //   dismissButtonStyle: 'cancel',
        //   preferredBarTintColor: '#453AA4',
        //   preferredControlTintColor: 'white',
        //   readerMode: false,
        //   animated: true,
        //   modalPresentationStyle: 'overFullScreen',
        //   modalTransitionStyle: 'partialCurl',
        //   modalEnabled: true,
        //   enableBarCollapsing: false,
        //   // Android Properties
        //   showTitle: true,
        //   toolbarColor: '#6200EE',
        //   secondaryToolbarColor: 'black',
        //   enableUrlBarHiding: true,
        //   enableDefaultShare: true,
        //   forceCloseOnRedirection: false,
        //   // Specify full animation resource identifier(package:anim/name)
        //   // or only resource name(in case of animation bundled with app).
        //   animations: {
        //     startEnter: 'slide_in_right',
        //     startExit: 'slide_out_left',
        //     endEnter: 'slide_in_left',
        //     endExit: 'slide_out_right'
        //   },
        //   headers: {
        //     'my-custom-header': 'my custom header value'
        //   }
        // })
        // Alert.alert(JSON.stringify(result))
      }
      // else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message)
    }
    // setisOpenMyPeople(true)
  }


  return (
    <View style={{ marginTop: 100, flex: 1 }} >
      {
        isOpenMyPeople ?
          <WebView source={{ uri: 'https://outlook.office.com/owa/?path=/people' }}
            onMessage={(e) => {
              console.tron.log("1", e)
            }}

          /> : null
      }


      <TouchableOpacity onPress={onPressMyPeopel}
      >
        <Text>open my people</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={onPressMic}
      >
        <Text>test</Text>
      </TouchableOpacity>

      {/* <GoogleSigninComponent
        ref={googleComponent}
        // get Config from react-native-comminity/google-signin
        config={{
          scopes: ['email', 'profile'],
          webClientId: "1007353833221-t4rojhcbnvu6mrkqb7ol5h1pdpbp0jm9.apps.googleusercontent.com",
          offlineAccess: true
        }}
        // only work while you are using defult button 
        // Icon: display only Google icon. Recommended size of 48 x 48.
        // Standard: icon with 'Sign in'. Recommended size of 230 x 48.
        // Wide: icon with 'Sign in with Google'. Recommended size of 312 x 48.
        size={"Wide"}
        // only work while you are using defult button 
        //Dark: apply a blue background
        //Light: apply a light gray background
        color={'Dark'}
        //disabled
        disabled={false}
        // return userInfo
        userInfo={(userInfoData) => {

        }}
        onError={(error) => {

        }}
        // return acess token
        getToken={(accessToken) => {
          console.tron.log('accessToken', accessToken)
        }}
        // customeButton={() => (
        //   <View style={{ height: 100, width: 100, backgroundColor: "blue" }} >
        //     <Text >sign in</Text>
        //   </View>
        // )

        // }
        style={{ width: 192, height: 48 }}
      />


      <FaceBookSignInComponent
        ref={facebookComponent}
        permissions={['public_profile']}
        disabled={false}
        onError={(e) => {
          console.warn(e)
        }}
        responsed={() => {

        }}
        onCancelled={() => {

        }}
        getAccessToken={() => {

        }}
        // customeButton={() => (
        //   <View style={{ height: 100, width: 100, backgroundColor: "red" }} >
        //     <Text >fb sign in</Text>
        //   </View>
        // )

        // }
        onLogout={() => {

        }}
      /> */}
    </View>
  )
}
