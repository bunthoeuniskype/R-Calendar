import React, { Component } from 'react';
import {  
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import { Button,FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SQLite from 'react-native-sqlite-2';
// import CalScreen from './CalScreen';

const database_name = 'AppCalendar.db'
const database_version = '1.0'
const database_displayname = 'SQLite Test Database'
const database_size = 200000;
let db;

const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {   
    backgroundColor:'#2089dc',
    marginTop:15,
    marginLeft:15,
    marginRight:15,
    padding: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  container:{
    backgroundColor:'white',
    minHeight:500
  },labelShow:{
    fontSize:18,
  }
};
const _formatTime = 'H:m';
const _formatDate = 'DD MMMM YYYY';

export default class AddEvent extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
        date:moment().format(_formatDate),time:moment().format(_formatTime),description:null,
        isDatePickerVisible: false,isTimePickerVisible:false
       };
       this.onDescription = this.onDescription.bind(this);
    }    
    
  onDescription(description){
    this.setState({
        description
    })    
  }

  // componentWillMount(){
  //    this.state = { 
  //       date:moment().format(_formatDate),time:moment().format(_formatTime),description:null
  //      };
  // }

   _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = (d) => {  
    newDate =  moment(d).format(_formatDate);
    this.setState({
      date:newDate
    }) 
    this._hideDatePicker();
  };

   _showTimePicker = () => this.setState({ isTimePickerVisible: true });

   _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

   _handleTimePicked = (t) => { 
     newTime =  moment(t).format(_formatTime);
    this.setState({
      time:newTime
    })  
    this._hideTimePicker();
  };
   
  openCB = () => {
    //open connect
  }

  errorCB = () => {
   //error connect
  }

  save = () =>{
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB) 
    db.transaction((txn) => {
      txn.executeSql('SELECT 1 FROM Version LIMIT 1',[], () => {  db.transaction(this.saveEvent, this.errorCB, () => { })},
        (error) => { }
      )
    })   
  } 

  saveEvent = (txn) => {
      date = this.state.date;  
      time = this.state.time;
      description = this.state.description; 
     txn.executeSql('INSERT INTO AppEvent (title,time,description) VALUES(:title,:time,:description)', [date,time,description],this.backFun, this.errorCB);
  }

  backFun=()=>{
   // CalScreen.loadAndQueryDB();
     this.props.navigation.goBack()
  }

  componentWillUnmount () {
      this.closeDatabase();
      this.setState = { 
        date:null,time:null,description:null
    };
  }

  closeDatabase () {
   
  }

  shouldComponentUpdate() {        
      return true;
  }

  render() {     
    return (     
      <ScrollView>
        <View style={styles.container}> 
        <FormLabel>កាលបរិច្ឆេទ : <Text style={styles.labelShow}> {this.state.date} </Text></FormLabel>
        <Button    
          raised
          style={styles.submitButton}
          onPress={ this._showDatePicker }
          title="ជ្រើសរើស​ កាលបរិច្ឆេទ"
        />
       
        <DateTimePicker
          mode='date'
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
        />

         <FormLabel>ពេលវេលា​​ : <Text style={styles.labelShow}> {this.state.time}</Text></FormLabel>
         <Button    
          raised 
          style={styles.submitButton}
          onPress={ this._showTimePicker }
          title="ជ្រើសរើស​ ពេលវេលា"
        />

         <DateTimePicker
          mode='time'
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
        />
        <FormLabel>ចំនាំ</FormLabel>
        <FormInput name="description" onChangeText={this.onDescription} placeholder="ចំនាំ" value={this.state.description}/>
         <Button    
          backgroundColor="#2089dc"         
          style={styles.submitButton}
          onPress={ this.save }
          title="រក្សាទុក"
        />
        </View>        
      </ScrollView>
    );
  }
}



