import React, { Component } from 'react';
import { Agenda,LocaleConfig } from 'react-native-calendars';
import {  
  ScrollView,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';


LocaleConfig.locales['kh'] = {
  monthNames: ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'],
  monthNamesShort: ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'],
  dayNames: ['អាទិ','ចន្ទ','អង្គារ','ពុធ','ព្រហ','សុក្រ','សៅរ៍'],
  dayNamesShort: ['អាទិត្យ','ចន្ទ','អង្គារ','ពុធ','ព្រហស្បតិ៍','សុក្រ','សៅរ៍'] };

LocaleConfig.defaultLocale = 'fr';

export default class CalScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {      
       
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
    return (   
        <ScrollView>
          <Agenda              
              items={
                {'2012-05-22': [{text: 'item 1 - any js object'}],
                '2012-05-23': [{text: 'item 2 - any js object'}],
                '2012-05-24': [],
                '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
                }}
              // callback that gets called when items for a certain month should be loaded (month became visible)
              loadItemsForMonth={(month) => {console.log('trigger items loading')}}
              // callback that fires when the calendar is opened or closed
              onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
              // callback that gets called on day press
              onDayPress={(day)=>{console.log('day pressed')}}
              // callback that gets called when day changes while scrolling agenda list
              onDayChange={(day)=>{console.log('day changed')}}
              // initially selected day
              selected={'2012-05-16'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2012-05-30'}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={50}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={50}
              // specify how each item should be rendered in agenda
              renderItem={(item, firstItemInDay) => {return (<View />);}}
              // specify how each date should be rendered. day can be undefined if the item is not first in that day.
              renderDay={(day, item) => {return (<View />);}}
              // specify how empty date content with no items should be rendered
              renderEmptyDate={() => {return (<View />);}}
              // specify how agenda knob should look like
              renderKnob={() => {return (<View />);}}
              // specify what should be rendered instead of ActivityIndicator
              renderEmptyData = {() => {return (<View />);}}
              // specify your item comparison function for increased performance
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              // Hide knob button. Default = false
              hideKnob={true}
              // By default, agenda dates are marked if they have at least one item, but you can override this if needed
              markedDates={{
                '2012-05-16': {selected: true, marked: true},
                '2012-05-17': {marked: true},
                '2012-05-18': {disabled: true}
              }}
              // agenda theme
              theme={{
                 'stylesheet.agenda.list': {
                     dayNum: {
                        width: '100%',
                        fontSize: 28,
                        fontWeight: '200',
                        textAlign: 'center',
                        color: '#43515c',
                    }
                },
                agendaDayTextColor: 'yellow',
                agendaDayNumColor: 'green',
                agendaTodayColor: 'red',
                agendaKnobColor: 'blue'
              }}
              // agenda container style
              style={{}}
            />
        </ScrollView>
    );
  }
}

