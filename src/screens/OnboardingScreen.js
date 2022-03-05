import {
  SafeAreaView,
  Animated,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components";
import slides from "../constants/onboardingData";
import OnboardingScreenItem from "../components/OnboardingScreenItem";
import { useState, useRef } from "react";

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <View style={{ flexDirection: "row", height: 64 }}>
        {data.map((x, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });
          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
              key={i.toString()}
            />
          );
        })}
      </View>
      <Text>Swipe to continue</Text>
    </>
  );
};
export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <SafeAreaView>
      <Container>
        <FlatListContainer>
          <List
            pagingEnabled
            horizontal
            showHorizontalScrollIndicator
            bounces={false}
            data={slides}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            scrollEventThrottle={30}
            renderItem={({ item }) => <OnboardingScreenItem item={item} />}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            ref={sliderRef}
          />
        </FlatListContainer>
        <Paginator data={slides} scrollX={scrollX} />
      </Container>
    </SafeAreaView>
  );
}
const Container = styled.View`
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const FlatListContainer = styled.View`
  flex: 3;
`;
const List = styled.FlatList``;
const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    width: 10,
    backgroundColor: "gray",
  },
});
