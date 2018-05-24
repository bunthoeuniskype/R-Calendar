import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';

const ProgressDialog = ({ visible }) => (
  <Modal
   animationType="slide"
   transparent={false}
   onRequestClose={() => { visible=false }}
    visible={visible}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>សូមរងចាំ.....</Text>
        <View style={styles.loading}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
          <View style={styles.loadingContent}>
            <Text>Loading</Text>
          </View> 
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 35,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
  },
  loadingContent: {
   
  }
})

export default ProgressDialog;