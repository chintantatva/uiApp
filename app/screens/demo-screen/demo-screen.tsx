import React, { FunctionComponent as Component, useRef } from "react";
import { View, Text } from "react-native";
import { GoogleSigninComponent } from '../../components/GoogleSigninComponent';



export const DemoScreen: Component = function DemoScreen() {
  const googleComponent = useRef(null);



  // There are method avlible for signout, revokeAccess,getCurrentUser,isSignedIn and you can call method as following
  // googleComponent.current.signOut()

  return (
    <View style={{ marginTop: 100 }} >
      <GoogleSigninComponent
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
        customeButton={() => (
          <View style={{ height: 100, width: 100, backgroundColor: "blue" }} >
            <Text >sign in</Text>
          </View>
        )

        }
        style={{ width: 192, height: 48 }}
      />
    </View>
  )
}
