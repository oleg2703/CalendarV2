import AppNavigator from "./navigation/AppNavigator";
import registerNNPushToken from 'native-notify';
import React, { useState, useEffect } from 'react';
export default function App() {
  registerNNPushToken(21616, 'WQRqRfdAqD9p8Wzjkww6LZ');
  return <AppNavigator/>;
}