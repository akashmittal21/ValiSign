import { StatusBar } from 'expo-status-bar';
import React from 'react';
import WelcomeScreen from './app/Screens/WelcomeScreen';
import HomeScreen from './app/Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import TimerOverlay from './app/Screens/OverlayTimer';
// import { Creative }

export default function App() {
  // return <WelcomeScreen />;
  // return <HomeScreen/>;
  return <TimerOverlay />;
} 
