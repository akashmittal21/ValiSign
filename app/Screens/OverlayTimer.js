import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const TimerOverlay = ({ onClose }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [circleProgress, setCircleProgress] = useState(0);
  const [boundaryProgress, setBoundaryProgress] = useState(0);

  useEffect(() => {
    let timerInterval = null;

    if (secondsRemaining > 0) {
      timerInterval = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [secondsRemaining]);

  useEffect(() => {
    const progress = secondsRemaining / 60;
    setCircleProgress(progress);
    setBoundaryProgress(1 - progress); // Reverse progress for the boundary
  }, [secondsRemaining]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      onClose();
    }
  }, [secondsRemaining, onClose]);

  return (
    <View style={styles.container}>
      <Svg height="70" width="150">
        {/* Black boundary */}
        <Circle
          cx="35"
          cy="35"
          r="25"
          fill="none"
          stroke={`rgba(0, 0, 0, ${boundaryProgress})`}
          strokeWidth="5"
          strokeLinecap="round"
          transform="rotate(-90 35 35)"
        />
        {/* Circle with red fill */}
        <Circle
          cx="35"
          cy="35"
          r="20"
          fill="transparent"
          stroke="red"
          strokeWidth="5"
          strokeDasharray="125.66" // Circumference of the circle: 2 * pi * r ≈ 125.66
          strokeDashoffset={(1 - circleProgress) * 125.66}
          strokeLinecap="round"
          transform="rotate(-90 35 35)"
        />
      </Svg>
      <View style={styles.secondsContainer}>
        <Text style={[styles.secondsText, { fontSize: 18 }]}>
          {secondsRemaining}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondsContainer: {
    position: 'absolute',
    left: 163,
  },
  secondsText: {
    fontWeight: 'bold',
  },
});

export default TimerOverlay;
