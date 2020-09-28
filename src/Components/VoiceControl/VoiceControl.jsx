"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var voice_1 = __importDefault(require("@react-native-community/voice"));
var react_native_elements_1 = require("react-native-elements");
var react_native_haptic_feedback_1 = __importDefault(require("react-native-haptic-feedback"));
var VoiceControl = /** @class */ (function (_super) {
    __extends(VoiceControl, _super);
    function VoiceControl(props) {
        var _this = _super.call(this, props) || this;
        _this._onSpeechRecgStart = function () {
            // console.log('recoding start...');
        };
        _this._onSpeechRecgEnd = function () {
            _this.props.onVoiceRecgEnd();
            // this._stopAnimation();
        };
        _this._onSpeechRecgResults = function (event) {
            _this.setState(function (prevState) { return ({
                speechResult: event.value[0],
                speechList: __spreadArrays(prevState.speechList, [event.value[0]]),
            }); });
            _this.onChangeVoice(_this.state.speechResult);
            _this._stopAnimation();
        };
        _this._onSpeechRecgError = function () {
            _this._stopAnimation();
        };
        _this._onRecordVoice = function () {
            var isRecord = _this.state.isRecord;
            var _a = _this.props, locale = _a.locale, duration = _a.duration;
            if (isRecord) {
                voice_1.default.stop();
            }
            else {
                voice_1.default.start(locale); //hi-IN //en-US
                setTimeout(function () {
                    _this.setState({ isRecord: false }, function () {
                        voice_1.default.stop();
                    });
                }, duration);
            }
            _this.setState({
                isRecord: !isRecord,
            });
        };
        _this._onPress = _this._onPress.bind(_this);
        _this.state = {
            isRecord: false,
            speechResult: "",
            speechList: [],
            isPressed: false,
            animated: new react_native_1.Animated.Value(0),
            opacityA: new react_native_1.Animated.Value(1),
        };
        voice_1.default.onSpeechStart = _this._onSpeechRecgStart;
        voice_1.default.onSpeechEnd = _this._onSpeechRecgEnd;
        voice_1.default.onSpeechResults = _this._onSpeechRecgResults;
        voice_1.default.onSpeechError = _this._onSpeechRecgError;
        return _this;
    }
    VoiceControl.prototype.componentWillUnmount = function () {
        this.setState({ speechList: this.state.speechList });
        voice_1.default.destroy().then(voice_1.default.removeAllListeners);
    };
    VoiceControl.prototype._runAnimation = function () {
        var _a = this.state, animated = _a.animated, opacityA = _a.opacityA;
        var rippleTimePeriod = this.props.rippleTimePeriod;
        react_native_1.Animated.loop(react_native_1.Animated.parallel([
            react_native_1.Animated.timing(animated, {
                toValue: 1,
                duration: rippleTimePeriod,
                useNativeDriver: false,
            }),
            react_native_1.Animated.timing(opacityA, {
                toValue: 0,
                duration: rippleTimePeriod,
                useNativeDriver: false,
            }),
        ])).start();
    };
    VoiceControl.prototype._stopAnimation = function () {
        var _a = this.state, animated = _a.animated, opacityA = _a.opacityA;
        var rippleTimePeriod = this.props.rippleTimePeriod;
        react_native_1.Animated.loop(react_native_1.Animated.parallel([
            react_native_1.Animated.timing(animated, {
                toValue: 0,
                duration: rippleTimePeriod,
                useNativeDriver: false,
            }),
            react_native_1.Animated.timing(opacityA, {
                toValue: 1,
                duration: rippleTimePeriod,
                useNativeDriver: false,
            }),
        ])).stop();
        this.setState({ isPressed: false });
    };
    VoiceControl.prototype._onPress = function () {
        var options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: true,
        };
        var hapticTriggerType = react_native_1.Platform.OS === "ios" ? "selection" : "contextClick";
        this._runAnimation();
        if (hapticTriggerType) {
            react_native_haptic_feedback_1.default.trigger(hapticTriggerType, options);
        }
        this.setState(function (state) { return ({ isPressed: !state.isPressed }); });
        this._onRecordVoice();
    };
    VoiceControl.prototype._micButton = function () {
        var _a = this.state, isPressed = _a.isPressed, animated = _a.animated, opacityA = _a.opacityA;
        var _b = this.props, onPressIconCntStyle = _b.onPressIconCntStyle, iconCntStyle = _b.iconCntStyle;
        var defaultStyle = {
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
            return (<react_native_1.Animated.View style={[defaultStyle.onPressIconCntStyle, onPressIconCntStyle]}>
          <react_native_elements_1.Icon name={this.props.micIcon.name} type={this.props.micIcon.type} size={this.props.micIcon.size} color={this.props.micIcon.color}/>
        </react_native_1.Animated.View>);
        }
        else {
            return (<react_native_1.View style={[defaultStyle.iconCntStyle, iconCntStyle]}>
          <react_native_elements_1.Icon name={this.props.micIcon.name} type={this.props.micIcon.type} size={this.props.micIcon.size} color={this.props.micIcon.color}/>
        </react_native_1.View>);
        }
    };
    VoiceControl.prototype.onChangeVoice = function (finalString) {
        this.props.onVoiceRecgStart(finalString);
    };
    VoiceControl.prototype.render = function () {
        var containerStyle = this.props.containerStyle;
        return (<react_native_1.View style={containerStyle}>
        <react_native_1.TouchableOpacity onPress={this._onPress}>
          {this._micButton()}
        </react_native_1.TouchableOpacity>
      </react_native_1.View>);
    };
    VoiceControl.defaultProps = {
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
    return VoiceControl;
}(React.Component));
exports.default = VoiceControl;
