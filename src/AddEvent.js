import React, { Component } from 'react';
import {  
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import moment from 'moment';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';



export default class AddEvent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {      
         formData:''
      };       
    }

    handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
        first_name:"",
        last_name:"",
        gender: '',
        birthday: Date,
        has_accepted_conditions: bool
        }
        */

        this.setState({formData:formData})
        this.props.onFormChange && this.props.onFormChange(formData);
      }
      handleFormFocus(e, component){
        //console.log(e, component);
      }
      openTermsAndConditionsURL(){

      }
    
    componentWillMount() {
      
    }
    componentWWillunMount(){

    }
    
    shouldComponentUpdate() {        
      return true;
    }
     
  render() {     
    return (     
      <ScrollView>   
       <Form
          ref='registrationForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)} >
              
          <InputField ref='last_name' placeholder='Last Name'/>
          <InputField
            multiline={true}
            ref='other_input'
            placeholder='Other Input'
            helpText='this is an helpful text it can be also very very long and it will wrap' />
          <Separator />
          <LinkField label="test test test" onPress={()=>{}}/>
          <SwitchField label='I accept Terms & Conditions'
            ref="has_accepted_conditions"
            helpText='Please read carefully the terms & conditions'/>
          <PickerField ref='gender'
            label='Gender'
            options={{
              "": '',
              male: 'Male',
              female: 'Female'
            }}/>
            <DatePickerField ref='birthday'
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date()}
            placeholder='Birthday'/>
          <TimePickerField ref='alarm_time'
        placeholder='Set Alarm'/>
          <DatePickerField ref='meeting'
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>
          </Form>
        
      </ScrollView>
    );
  }
}



