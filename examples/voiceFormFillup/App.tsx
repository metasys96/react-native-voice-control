import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { VoiceControl } from "@metasys96/react-native-voice-control";

const DataField = [
  {
    command: "name",
    field: "name",
    Name: "Name",
  },
  {
    command: "gender",
    field: "gender",
    Name: "Gender",
  },
  {
    command: "country",
    field: "country",
    Name: "Country",
  },
  {
    command: "state",
    field: "state",
    Name: "State",
  },
  {
    command: "address",
    field: "address",
    Name: "Address",
  },
];

interface Props {}
interface State {
  name: string;
  country: string;
  state: string;
  gender: string;
  address: string;
  voiceText: string;
  voiceTrimedData: string;
  errorText: string;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: null,
      country: null,
      state: null,
      gender: null,
      address: null,
      voiceText: "Add voice data",
      voiceTrimedData: null,
      errorText: null,
    };
  }
  handleVoiceText = (text: string) => {
    let addedVoiceText = text;
    this.setState({ voiceText: addedVoiceText }, () => {
      if (Platform.OS !== "ios") {
        this.setDelFieldText(this.state.voiceText.toLocaleLowerCase());
      }
    });
  };

  setDelFieldText(voiceText: string) {
    if (voiceText.includes("delete")) {
      DataField.forEach((item) => {
        if (voiceText.includes(item.command)) {
          this.setState({
            [item.field]: "",
          } as any);
        }
      });
    } else {
      DataField.forEach((item) => {
        if (voiceText.includes(item.command)) {
          this.setState({
            [item.field]: voiceText.replace(item.command, "").trim(),
          } as any);
        }
      });
    }
  }

  onVoiceRecgEnd = () => {
    if (Platform.OS === "ios") {
      this.setDelFieldText(this.state.voiceText.toLocaleLowerCase());
    }
  };
  renderFields = () => {
    return DataField.map((item: any) => {
      const fieldName: keyof State = item.field;

      return (
        <View style={styles.container} key={item.Name}>
          <View>
            <Text style={{ fontSize: 16 }}>{item.Name}:</Text>
          </View>
          <TextInput
            placeholder={item.Name}
            style={styles.inputContainer}
            onChangeText={(text) => this.setState({ [fieldName]: text } as any)}
            value={this.state[fieldName]}
          />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ marginTop: "5%" }}>
        <View style={styles.voiceFillContainer}>
          <VoiceControl
            onVoiceRecgStart={this.handleVoiceText}
            onVoiceRecgEnd={this.onVoiceRecgEnd}
            onPressIconCntStyle={{ height: 60, width: 60, borderRadius: 30 }}
            iconCntStyle={{ height: 60, width: 60 }}
            micIcon={{
              type: "foundation",
              name: "microphone",
              color: "red",
              size: 40,
            }}
            duration={5000}
            rippleTimePeriod={1000}
          />
          <Text>{this.state.voiceText}</Text>
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
        >
          <ScrollView>{this.renderFields()}</ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    textTransform: "capitalize",
  },
  container: {
    display: "flex",
    marginVertical: "1%",
    marginHorizontal: "3%",
  },
  voiceFillContainer: {
    width: "100%",
    alignItems: "center",
    marginHorizontal: "3%",
    marginVertical: "3%",
  },
});
