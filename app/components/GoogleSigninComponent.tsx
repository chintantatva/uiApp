import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import React, { useEffect, forwardRef, useImperativeHandle, SFC } from "react";
import { View, Alert } from "react-native";


interface GoogleSigninComponentProps {
    config: object,
    buttonStyle: object,
    buttonColor: string,
    buttonSize: string,
    disabled: boolean,
    getToken: any,
    onError: any,
    userInfo: any,
    ref: any
}

export const GoogleSigninComponent: SFC<GoogleSigninComponentProps> = forwardRef((props, ref) => {

    useEffect(() => {
        GoogleSignin.configure(props.config);
    }, [])

    useImperativeHandle(ref, () => ({
        async  signOut() {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            } catch (error) {
                console.error(error);
            }
        }
    }));

    useImperativeHandle(ref, () => ({
        async revokeAccess() {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            } catch (error) {
                console.error(error);
            }
        }
    }));

    useImperativeHandle(ref, () => ({
        async getCurrentUser() {
            const currentUser = await GoogleSignin.getCurrentUser();
            return currentUser
        }
    }));

    useImperativeHandle(ref, () => ({
        async isSignedIn() {
            const isSignedIn = await GoogleSignin.isSignedIn();
            return isSignedIn
        }
    }));


    useImperativeHandle(ref, () => ({
        async getCurrentUser() {
            const currentUser = await GoogleSignin.getCurrentUser();
            return currentUser
        }
    }));

    async function signIn() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            props.userInfo(userInfo)
            const token = await GoogleSignin.getTokens();
            props.getToken(token)
            console.warn("done", userInfo)

        } catch (error) {
            console.warn(error)
            props.onError(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancelled')
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('InProgress')
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play service are not avalible')
                // play services not available or outdated
            }
        }
    }

    function getSize() {
        switch (props.buttonSize) {
            case 'Wide':
                return GoogleSigninButton.Size.Wide
            case 'Standard':
                return GoogleSigninButton.Size.Standard
            case 'Icon':
                return GoogleSigninButton.Size.Icon
            default:
                return GoogleSigninButton.Size.Wide
        }
    }

    function getButtonColor() {
        switch (props.buttonColor) {
            case 'Dark':
                return GoogleSigninButton.Color.Dark
            case 'Standard':
                return GoogleSigninButton.Color.Light
            default:
                return GoogleSigninButton.Color.Dark
        }
    }


    return (
        <View >
            <GoogleSigninButton
                style={props.buttonStyle}
                size={getSize()}
                color={getButtonColor()}
                onPress={signIn}
                disabled={props.disabled}
            />
        </View>
    )
})
