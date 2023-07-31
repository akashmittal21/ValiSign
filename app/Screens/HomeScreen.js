import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Image, Button, TouchableOpacity, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [application, setApplications] = useState([
    { label: 'GroupBenfitz', value: 'groupbenefits' },
    { label: 'DGSMS', value: 'dgsms' },
    // Add more options as needed
  ]);

  return (
    <ImageBackground source={require("../assets/login/background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image source={require("../assets/HomeScreen/valisign.png")} style={styles.logo} />
        <View style={styles.line} />
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open = { open }
            setOpen = {setOpen}
            value = { value }
            placeholder = 'Select Application'
            placeholderStyle = {{
              fontSize: 18, 
              fontWeight: 'bold'
            }}
            setValue={setValue}
            items = { application }
            setItems = {setApplications}
            listItemLabelStyle={{ 
              fontSize : 18,
              fontWeight: 'bold' 
            }}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            listItemContainerStyle = {{ 
              backgroundColor: 'white',
              fontWeight: 'bold',
              fontSize: 18
            }}
            onChangeItem={(item) => setApplications(item.value)}
            itemSeparator = { true }
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.getCodeButton}>
            <Image source={require("../assets/HomeScreen/button.png")}/>
            <Text style={styles.buttonText}>Get ValiSign Code</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      

      
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
    qpaddingBottom: 20, // Add paddingBottom to push content up
  },
  dropdownContainer: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  getCodeButton: {
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#004E8E',
    alignSelf: 'center',
    margin: 610,
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
  },
  line: {
    borderBottomWidth: 1, 
    borderBottomColor: '#FCFCFC', 
    width: '90%', 
    alignSelf: 'center',
    marginTop: -14,
  },
  logo: {
    width: '55%',
    height: 100,
    // marginTop: 50,
    alignSelf: 'center',
    resizeMode: 'contain', // Use resizeMode to fit the image within the container
  },
});


export default HomeScreen;
