import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  ImageSourcePropType,
  Animated,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Locations from './model/locations';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import SunIcon from './assets/sun.svg';
import RainIcon from './assets/rain.svg';
import MoonIcon from './assets/moon.svg';
import CloudyIcon from './assets/cloudy.svg';
import MenuIcon from './assets/menu.svg';
import SearchIcon from './assets/search.svg';

const WeatherIcon = (weatherType) => {
  if (weatherType === 'Sunny') {
    return <SunIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Cloudy') {
    return <CloudyIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Rainy') {
    return <RainIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Night') {
    return <MoonIcon width={34} height={34} fill="#fff" />;
  }
};

const App = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  let bgImg: ImageSourcePropType;
  return (
    <>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={1}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        {Locations.map((location, index) => {
          if (location.weatherType === 'Sunny') {
            bgImg = require('./assets/sunny.jpeg');
          } else if (location.weatherType === 'Night') {
            bgImg = require('./assets/night2.jpeg');
          } else if (location.weatherType === 'Cloudy') {
            bgImg = require('./assets/cloudy.jpeg');
          } else if (location.weatherType === 'Rainy') {
            bgImg = require('./assets/rainy.jpeg');
          }

          return (
            <View style={{ width: windowWidth, height: windowHeight }} key={index}>
              <ImageBackground
                source={bgImg}
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 20,
                  }}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.date}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temp}>{location.temperature}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {WeatherIcon(location.weatherType)}
                        <Text style={styles.weather}> {location.weatherType}</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper}>
                    {/* Wind */}
                    <View style={{ justifyContent: 'space-between' }}>
                      <Text style={styles.infoText}>Wind</Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 24,
                          fontFamily: 'Lato-Regular',
                        }}>
                        {location.wind}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Lato-Light',
                          fontSize: 24,
                        }}>
                        km/h
                      </Text>
                      <View style={styles.infoBar}>
                      <View
                        style={{
                          width: location.wind/2,
                          height: 5,
                          backgroundColor: 'rgba(0,255,0,0.5)',
                        }}
                      />
                      </View>
                    </View>
                    {/* Rain */}
                    <View style={{ justifyContent: 'space-between' }}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Lato-Regular',
                          fontSize: 24,
                        }}>
                        {location.rain}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Lato-Light',
                          fontSize: 24,
                        }}>
                        %
                      </Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.rain / 2,
                            height: 5,
                            backgroundColor: 'rgba(255,0,0,0.5)',}} />
                      </View>
                    </View>
                    {/* Humidity */}
                    <View style={{ justifyContent: 'space-between' }}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Lato-Regular',
                          fontSize: 24,
                        }}>
                        {location.humidity}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Lato-Light',
                          fontSize: 24,
                        }}>
                        %
                      </Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.humidity / 2,
                            height: 5,
                            backgroundColor: 'rgba(255,0,0,0.5)',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => { }}>
          <SearchIcon width={24} height={24} fill="#fff" />
          <MenuIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 140,
          left: 20,
          flexDirection: 'row',
        }}>
        {Locations.map((location, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={index} style={[styles.normalDot, { width }]} />
          );
        })}
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  fillBar: {
    width: 35,
    height: 5,
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  infoText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  date: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
  },
  temp: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weather: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
});
