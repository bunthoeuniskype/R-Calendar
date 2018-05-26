import React, { Component } from 'react';
import {  
  ScrollView,
  View,
  Text,
  StyleSheet, YellowBox ,Platform
} from 'react-native';
import moment from 'moment';
import { Button,FormLabel, FormInput, FormValidationMessage,Header } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SQLite from 'react-native-sqlite-2';
import ProgressDialog from './component/ProgressDialog';

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
  },
  labelMa:{
    paddingLeft:15,
    fontFamily:'khmer os battambang',
    fontSize:22,
    paddingBottom:10,
    paddingTop:15
  }
};
const _formatTime = 'H:m';
const _formatDate = 'DD MMMM YYYY';


export default class AddEvent extends React.Component {

    constructor(props) {
      super(props);

      YellowBox.ignoreWarnings(
          ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'      
      ]);
      this.state = { 
        date:moment().format(_formatDate),time:moment().format(_formatTime),description:null,
        isDatePickerVisible: false,isTimePickerVisible:false,
        clickBtn:true,showP:false
       };
       this.onDescription = this.onDescription.bind(this);
    }    
    
  onDescription(description){
    this.setState({
        description
    })    
  }

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
    db = SQLite.openDatabase('app_kh.db', '1.0', '', 1);
    if(this.state.clickBtn==true){
      this.setState({clickBtn:false,showP:true})
      db.transaction((txn) => {    
          date = this.state.date;  
          time = this.state.time;
          description = this.state.description; 
          txn.executeSql('INSERT INTO event_tbl(title,time,description) VALUES(:title,:time,:description)', [date,time,description],this.backFun, this.errorCB);
      })   
    }    
  } 

  backFun=()=>{     
     this.setState({showP:false}) 
     this.props.navigation.state.params.backRefresh(this);
     this.props.navigation.goBack()
  }

  componentWillUnmount () {
    //   this.closeDatabase();
    //   this.setState = { 
    //     date:null,time:null,description:null
    // };
  }

  closeDatabase () {
   
  }

  shouldComponentUpdate() {        
      return true;
  }

  render() {     
    return (     
      <View style={{backgroundColor:'#ffffff',marginBottom:5,flex:1}}>
       <Header      
        placement="left"
        leftComponent={{ icon: 'arrow-back',title: 'ថ្ងៃនេះ', color: '#fff',onPress:() => this.props.navigation.goBack() }}
        centerComponent={{ text: 'ប្រតិការណ៏', style: { color: '#fff',fontSize:18 } }}         
        outerContainerStyles={styles.header}
       />  
      <ScrollView>
        <View style={styles.container}> 
        <ProgressDialog visible={this.state.showP} />
        <Text style={styles.labelMa}> កាលបរិច្ឆេទ : <Text style={styles.labelShow}> {this.state.date} </Text></Text>
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

         <Text style={styles.labelMa}>ពេលវេលា​​ : <Text style={styles.labelShow}> {this.state.time}</Text> </Text>
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
        <Text style={styles.labelMa}> ចំនាំ</Text>
        <FormInput name="description" onChangeText={this.onDescription} placeholder="ចំនាំ" value={this.state.description}/>
        <Text style={{padding:15}}>{this.state.description}</Text>
         <Button    
          backgroundColor="#2089dc"         
          style={styles.submitButton}
          onPress={ this.save }
          title="រក្សាទុក"
        />
        </View>        
      </ScrollView>
      </View>    
    );
  }
}



