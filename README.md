# react-native-voice-control

Cross-platform development is now an essential aspect of softwaredevelopment. Node Packet Manager, the online repository is a go to site for React Programmers. This is MetaSys' contribution based on challenges we had while developing a single application for both Android and iOS. We offer a flexible NPM package, for UI form field widgets which will work on both Android and iOS platforms. The package is based on React Native and typescript, which provides an error-free field. It also gives you a clean and consistent look and feel on iOS and Android devices with high performance.

This package recodes the voice data using a microphone and converts it into text. Developers can use this text data for various purposes for example filling up the form, performing an action based on keyword, filtering data, etc. Developers can pass the required properties and get the result easily. The below documentation will help you to easily integrate this package with your React Native project.

## Content

1. Installation and Linking
2. Screenshots
3. Getting stated
4. Properties
5. Contribution

## Installation and Linking

Run command `npm i @metasys96/react-native-animated-voice -save`

You also have to install and link **react-native-elemnets**, **react-native-vector-icons**, **react-native-haptic-feedback**, and **@react-native-community/voice**.

**Android linking**

Add the following lines in android/app/src/main/AndroidManifest.xml.

```
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MICROPHONE" />
<uses-feature android:name="android.hardware.microphone" android:required="true" />
```

**Ios linking**

Add the following lines in Info.plist file.

```
<dict>
 ...
<key>NSMicrophoneUsageDescription</key>
<string>Description of why you require the use of the microphone</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Description of why you require the use of the speech recognition</string>
 ...
</dict>
```

## Screenshot

<img  src="https://github.com/metasys96/react-native-voice-control/blob/master/voiceControlImg.png"  width="600"  height="650"/>

## Getting started

```
Import {VoiceControl} from '@metasys96/react-native-voice-control' // import VoiceControl component

// add function in component
voiceRecgStart = (voiceData : string) => { // Invoked when voice detected and return string
}

voiceRecgEnd = () =>{ // Invoked when voice detection stops
}

return (
	<VoiceControl
		onVoiceRecgStart={this.voiceRecgStart}
		onVoiceRecgEnd={this.voiceRecgEnd}
       // add other props if required
     />
)
```

## Properties

| Name                | Description                                 | Type     | Default                                                   | Required |
| ------------------- | ------------------------------------------- | -------- | --------------------------------------------------------- | -------- |
| micIcon             | Display Icon                                | Object   | {type:'foundation',name:'microphone',color:'red',size:20} | No       |
| onVoiceRecgStart    | Invoked when voice detected                 | function | -                                                         | Yes      |
| onVoiceRecgEnd      | Invoked when voice detection stops          | function | -                                                         | Yes      |
| locale              | -                                           | string   | 'en-US'                                                   | No       |
| duration            | Voice recognition time                      | number   | 10000                                                     | No       |
| rippleTimePeriod    | Total time to complete one ripple animation | number   | 1500                                                      | No       |
| rippleColor         | Ripple animation color                      | string   | 'grey'                                                    | No       | 
| onPressIconCntStyle | onPress icon container style and animation  | style    | {{width: 60,height:60,borderRaduis:30}}                   | No       |
| iconCntStyle        | Icon conatiner style                        | style    | -                                                         | No       |
| containerStyle | - | style | - | No |

Note:- If the voice not detected within 3 seconds (3000 ms) , animation and voice detection stops automatically. rippleTimePeriod is inversly proportional to animation spdeed.

## Contribution

Any type of issues are welcome. Please add screenshots of the bug and code snippet. Also the quickest way to solve the bug is to reproduce it with one of the examples. We would also welcome Pull Requests.

git clone https://github.com/metasys96/react-native-voice-control/tree/master/examples

`npm install`\
\
`react-native run-android` or `react-native run-android`\
\
Copyright and License

## Author

[MetaSys Software Pvt. Ltd.](https://github.com/metasys96)

## License

[MIT](./LICENSE)

Copyright 2020 MetaSys Software Pvt. Ltd. All rights reserved.
e-control
