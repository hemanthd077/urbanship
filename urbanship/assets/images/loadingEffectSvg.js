// ModernLoading.js
import React from 'react';
import { View, StyleSheet, ActivityIndicator ,Text} from 'react-native';

const ModernLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#30c06b" />
   <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModernLoading;



// import React from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// const LoadingScreen = () => {
//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#007AFF" />
//       <Text style={styles.loadingText}>Loading...</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:"#ffffff",
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//   },
// });

// export default LoadingScreen;
