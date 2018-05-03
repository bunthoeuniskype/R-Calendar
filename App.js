/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {LocaleConfig, Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

LocaleConfig.locales['kh'] = {
  monthNames: ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'],
  monthNamesShort: ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'],
  dayNames: ['អាទិ','ចន្ទ','អង្គារ','ពុធ','ព្រហ','សុក្រ','សៅរ៍'],
  dayNamesShort: ['អាទិត្យ','ចន្ទ','អង្គារ','ពុធ','ព្រហស្បតិ៍','សុក្រ','សៅរ៍']
};

LocaleConfig.defaultLocale = 'kh';

const customStyle = {
    currentDayCircle: {
      backgroundColor: 'blue',
    },
    eventIndicatorFiller: {
      backgroundColor: 'blue',
      width: 10,
      height: 10,
    },
     hasEventText: {
      backgroundColor: 'blue',
    },
    weekRow: {
      backgroundColor: 'blue',
    },
  }

const themeStyle = {
            backgroundColor: '#ffffff',
            calendarBackground: '#00DDFF',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#87ED54',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            textDayFontFamily: 'Khmer OS Battambang',
            textMonthFontFamily: 'Khmer OS Battambang',
            textDayHeaderFontFamily: 'Khmer OS Battambang',
            textMonthFontWeight: 'bold',
            textDayFontSize: 24,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14
}

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <View>
      <Calendar
            showEventIndicators={true}
            eventDates={['2018-05-01', '2018-15-07', '2018-05-19']}               
            // Initially visible month. Default = Date()
            current={moment().format('YYYY-MM-DD')}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2018-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2018-12-31'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {console.log('selected day', day)}}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MMM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            nextButtonText={'ខែបន្ទាប់'}   
            prevButtonText={'ខែមុន'}   
            // Hide month navigation arrows. Default = false
            // hideArrows={true}
            // // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}         
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={themeStyle}
          scrollEnabled={true}   
          showControls={true}               // False hides prev/next buttons. Default: False  ​​​​​​​​​​​​​​​​   
          onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
          onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
          onTouchNext={this.onTouchNext}    // Callback for next touch event
          onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
          onTitlePress={this.onTitlePress}  // Callback on title press
          //renderDay={<CustomDay />}         // Optionally render a custom day component
          customStyle={customStyle}  
          onDayPress={this.onDayPress} 
          />                
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

}

const styles = StyleSheet.create({
  
   calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height:'auto',
        width:'100%',
        paddingBottom:10,
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee'
    },
    container: {
        flex: 1,
        backgroundColor: 'gray'
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
