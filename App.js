import { Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import OnboardingScreen from "./src/screens/OnboardingScreen";
export default function App() {
  return (
    <Container>
      {/* <Ionicons name="ios-notifications" /> */}
      <OnboardingScreen />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
