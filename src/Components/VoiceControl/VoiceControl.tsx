import * as React from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import Voice from "@react-native-community/voice";
import { Icon } from "react-native-elements";
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from "react-native-haptic-feedback";

interface Props {
  onVoiceRecgStart: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  onPressIconCntStyle?: any;
  onVoiceRecgEnd: () => void;
  iconCntStyle?: any;
  micIcon?: micIcon;
  duration?: number;
  locale?: string;
  rippleTimePeriod?: number;
  rippleColor?: string;
}
interface State {
  isRecord: boolean;
  speechResult: string;
  speechList: Array<string>;
  isPressed: boolean;
  animated: any;
  opacityA: any;
}

export default class VoiceControl extends React.Component<Props, State> {
  public static defaultProps = {
    micIcon: {
      type: "foundation",
      name: "microphone",
      color: "red",
      size: 20,
    },
    duration: 10000,
    locale: "en-US",
    rippleTimePeriod: 1500,
    rippleColor: "grey",
  };
  constructor(props: Props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      isRecord: false,
      speechResult: "",
      speechList: [],
      isPressed: false,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1),
    };
    Voice.onSpeechStart = this._onSpeechRecgStart;
    Voice.onSpeechEnd = this._onSpeechRecgEnd;
    Voice.onSpeechResults = this._onSpeechRecgResults;
    Voice.onSpeechError = this._onSpeechRecgError;
  }

  componentWillUnmount() {
    this.setState({ speechList: this.state.speechList });
    Voice.destroy().then(Voice.removeAllListeners);
  }

  _runAnimation() {
    const { animated, opacityA } = this.state;
    const { rippleTimePeriod } = this.props;
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: rippleTimePeriod,
          useNativeDriver: false,
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: rippleTimePeriod,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }

  _stopAnimation() {
    const { animated, opacityA } = this.state;
    const { rippleTimePeriod } = this.props;

    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 0,
          duration: rippleTimePeriod,
          useNativeDriver: false,
        }),
        Animated.timing(opacityA, {
          toValue: 1,
          duration: rippleTimePeriod,
          useNativeDriver: false,
        }),
      ])
    ).stop();
    this.setState({ isPressed: false });
  }

  _onPress() {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    };

    let hapticTriggerType: HapticFeedbackTypes =
      Platform.OS === "ios" ? "selection" : "contextClick";

    this._runAnimation();
    if (hapticTriggerType) {
      ReactNativeHapticFeedback.trigger(hapticTriggerType, options);
    }
    this.setState((state) => ({ isPressed: !state.isPressed }));
    this._onRecordVoice();
  }

  _micButton() {
    const { isPressed, animated, opacityA } = this.state;
    const { onPressIconCntStyle, iconCntStyle } = this.props;

    const defaultStyle = {
      onPressIconCntStyle: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: this.props.rippleColor,
        opacity: opacityA,
        transform: [
          {
            scale: animated,
          },
        ],
      },
      iconCntStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
      },
    };

    if (!this.props.micIcon) {
      return;
    }

    if (isPressed) {
      return (
        <Animated.View
          style={[defaultStyle.onPressIconCntStyle, onPressIconCntStyle]}
        >
          <Icon
            name={this.props.micIcon.name}
            type={this.props.micIcon.type}
            size={this.props.micIcon.size}
            color={this.props.micIcon.color}
          />
        </Animated.View>
      );
    } else {
      return (
        <View style={[defaultStyle.iconCntStyle, iconCntStyle]}>
          <Icon
            name={this.props.micIcon.name}
            type={this.props.micIcon.type}
            size={this.props.micIcon.size}
            color={this.props.micIcon.color}
          />
        </View>
      );
    }
  }

  _onSpeechRecgStart = () => {
    // console.log('recoding start...');
  };

  _onSpeechRecgEnd = () => {
    this.props.onVoiceRecgEnd();
    // this._stopAnimation();
  };

  _onSpeechRecgResults = (event: any) => {
    this.setState((prevState) => ({
      speechResult: event.value[0],
      speechList: [...prevState.speechList, event.value[0]],
    }));
    this.onChangeVoice(this.state.speechResult);
    this._stopAnimation();
  };
  _onSpeechRecgError = () => {
    this._stopAnimation();
  };
  _onRecordVoice = () => {
    const { isRecord } = this.state;
    const { locale, duration } = this.props;

    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start(locale); //hi-IN //en-US
      setTimeout(() => {
        this.setState({ isRecord: false }, () => {
          Voice.stop();
        });
      }, duration);
    }
    this.setState({
      isRecord: !isRecord,
    });
  };

  onChangeVoice(finalString: any) {
    this.props.onVoiceRecgStart(finalString);
  }
  render() {
    const { containerStyle } = this.props;
    return (
      <View style={containerStyle}>
        <TouchableOpacity onPress={this._onPress}>
          {this._micButton()}
        </TouchableOpacity>
      </View>
    );
  }
}
