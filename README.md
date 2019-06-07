# About this Project
TBD

# Functionalities
TBD

# Getting Started
## Prerequisites
To build and run this project, you will need to setup a proper development environment. 

You will need to setup:
1. React-Native
2. Android SDK (for android platform)
    - SDK version: 26
    - Build tools: 26.0.2
3. IOS - TBD

## External prerequisites
This application depends on several external services. To be abele to successfully build and run this application, you will have to setup the following services:
### 1. Firebase 
You will need a Firebase project: https://console.firebase.google.com
### 2. Google Maps
TBD
### 3. Facebook
TBD

## Build and Run - Android device
### Cloning the Repository
    $ git clone https://github.com/makingwaves/MakingLunch 
    $ cd MakingLunch

### Install dependencies
    $ npm install

### Setup Firebase
1. Create new keystore (under **MakingLunch\keystores** folder):

       $ mkdir .\keystores && cd .\keystores
       $ keytool -genkey -alias com.makingLunch -keyalg RSA -keystore dev.keystore -keysize 2048   
    The tool will ask you to provide keys store password, key password and some other information. After a keystore adn the com.makingLunch key are successfully created, run following command to read the SHA1 fingerprint.

        $ keytool -list -v -keystore dev.keystore
    
2. Add android application to Firebase with the name ```com.makingLunch``` and provide SHA1 fingerprint, obtained in step 1
3. Download generated google-services.json file from Firebase to **MakingLunch\android\app**
### Setup environment variables
Create a .env file in the MakingLunch directory:

    FACEBOOK_APP_ID=<facebook app id>
    SERVER_URL=<backend server url>
    KEYSTORE_WEBCLIENT_ID=<google web client id>
    GOOGLE_MAPS_ID=<google maps id>
    SENDERID=<sender id>

    # Setup local keystore
    DEVELOP_STORE_FILE=../keystores/dev.keystore
    DEVELOP_KEY_ALIAS=com.makingLunch
    DEVELOP_STORE_PASSWORD=<key store password>
    DEVELOP_KEY_PASSWORD=<key password>

**FACEBOOK_APP_ID** - TBD \
**SERVER_URL** - TBD \
**KEYSTORE_WEBCLIENT_ID** - This is a OAuth2.0 google client id created by Firebase. You can get it from Google Developers Console - it will be called like 'Web client (auto created by Google Service)'. Or alternatively you can read this value from google-services.json from property client.services.appinvite_service.other_platform_oauth_client.client_id\
**GOOGLE_MAPS_ID** - TBD \
**SENDERID** - TBD 

### Build and run on Android device
The following command will build and install the application onto your Android device. Make sure that you have a device conned or a AVD running.

Debug version:

    $ react-native run-android

Relese version:

    $ react-native run-android --variant=relese

### Troubleshooting
1. **Unable to load script from assets index.android.bundle.** Error \
Make sure you did configure a reverse proxy on your device: e.g.

        $ adb reverse tcp:8081 tcp:8081

2. Google login does not work.
    
    - Check if copied SHA1 key is correct
    - Check if application name is ```com.makingLunch```
    - Check the google-services.json file
    - Check if KEYSTORE_WEBCLIENT_ID is correct
    - Check if you configured google login screen (provide support email etc.)
![Google console screen](https://github.com/makingwaves/MakingLunch/tree/deployment/doc/google_console.png)