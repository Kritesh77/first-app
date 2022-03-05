import { useWindowDimensions, Image } from "react-native";
import styled from "styled-components";

export default OnboardingScreenItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <Container width={width}>
      <Img source={item.image} width={width} />
      <Div>
        <H1>{item.title}</H1>
        <P>{item?.desc}</P>
      </Div>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
`;
const Img = styled.Image`
  flex: 0.7;
  width: ${(props) => props.width}px;
  resize-mode: contain;
  justify-content: center;
`;

const Div = styled.View`
  align-items: center;
  flex: 0.3;
`;
const H1 = styled.Text`
  font-weight: 600;
  letter-spacing: 5px;
  font-size: 30px;
  margin-bottom: 10px;
`;
const P = styled.Text`
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 18px;
  opacity: 0.7;
`;
