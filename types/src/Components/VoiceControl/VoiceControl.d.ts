import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
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
    static defaultProps: {
        micIcon: {
            type: string;
            name: string;
            color: string;
            size: number;
        };
        duration: number;
        locale: string;
        rippleTimePeriod: number;
        rippleColor: string;
    };
    constructor(props: Props);
    componentWillUnmount(): void;
    _runAnimation(): void;
    _stopAnimation(): void;
    _onPress(): void;
    _micButton(): JSX.Element | undefined;
    _onSpeechRecgStart: () => void;
    _onSpeechRecgEnd: () => void;
    _onSpeechRecgResults: (event: any) => void;
    _onSpeechRecgError: () => void;
    _onRecordVoice: () => void;
    onChangeVoice(finalString: any): void;
    render(): JSX.Element;
}
export {};
