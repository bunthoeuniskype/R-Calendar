import React, { Component } from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
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
import Timeline from 'react-native-timeline-listview';

let momentInUTC = moment;

const utcDateToString = (momentInUTC) => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};

const dataArr = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ];

export default class CalScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {      
       text: '',
       data:dataArr
      };       
    }
    
    componentWillMount() {
      
    }
    componentWWillunMount(){

    }
    
    shouldComponentUpdate() {        
      return true;
    }
     
  render() {  
    const { navigate } = this.props.navigation;
    const eventTitle = 'Lunch';
    const nowUTC = moment.utc();
    return (     
      <ScrollView>   
        <Button     
          onPress={ () => navigate('AddEvent') }
          title="បញ្ចួលប្រតិការណ៏ថ្មី"
        />
        
        <Timeline
          data={this.state.data}
        />
            
        </ScrollView>
    );
  }

  static addToCalendar = (title, startDateUTC) => {
    const eventConfig = {
      title,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
    };

    AddCalendarEvent.presentEventDialog(eventConfig)
      .then((eventInfo) => {
        //{ calendarItemIdentifier, eventIdentifier}
        // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
        // These are two different identifiers on iOS.
        // On Android, where they are both equal and represent the event id, also strings.
        // when false is returned, the dialog was dismissed
        if (eventInfo) {
          console.warn(JSON.stringify(eventInfo));
        } else {
          console.warn('dismissed');
        }
      })
      .catch((error) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

  static editCalendarEventWithId = (eventId) => {
    const eventConfig = {
      eventId,
    };

    AddCalendarEvent.presentEventDialog(eventConfig)
      .then(eventId => {
        // eventId is always returned when editing events
        console.warn(eventId);
      })
      .catch((error) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});




