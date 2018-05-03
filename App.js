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
  View,
  FlatList,
  StatusBar,
  ScrollView,
  Modal
} from 'react-native';
import {LocaleConfig, Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { Icon } from 'react-native-elements';

LocaleConfig.locales['kh'] = {
  monthNames: ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'],
  monthNamesShort: ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'],
  dayNames: ['អាទិ','ចន្ទ','អង្គារ','ពុធ','ព្រហ','សុក្រ','សៅរ៍'],
  dayNamesShort: ['អាទិត្យ','ចន្ទ','អង្គារ','ពុធ','ព្រហស្បតិ៍','សុក្រ','សៅរ៍']
};

LocaleConfig.defaultLocale = 'kh';

const customStyle = {
    currentDayCircle: {
      backgroundColor: 'gray',
    },
    eventIndicatorFiller: {
      backgroundColor: 'gray',
      width: 10,
      height: 10,
    },
     hasEventText: {
      backgroundColor: 'gray',
    },
    weekRow: {
      backgroundColor: 'gray',
    },
  }

const themeStyle = {
            backgroundColor: '#ffffff',
            calendarBackground: '#00DDFF',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#EB3933',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',                           
            arrowColor: 'blue',
            monthTextColor: 'blue',
            textDayFontFamily: 'Khmer OS Battambang',
            textMonthFontFamily: 'Khmer OS Battambang',
            textDayHeaderFontFamily: 'Khmer OS Battambang',
            textMonthFontWeight: 'bold',
            textDayFontSize: 24,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14
}

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)
const _formatView = 'DD MMMM, YYYY'
type Props = {};
export default class App extends Component<Props> {

  initialState = {
      [_today]: {disabled: true}
  }

  constructor(props) {
    super(props);
    this.state = {
       _markedDates: this.initialState,
       collectMarkedDate: {},
       modalVisible: false,
       _infoDate:{date:'',event:'',description:''},
       eventArr:[],
    };   
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onDaySelect = (day) => {
      this.setModalVisible(true);
      const _selectedDay = moment(day.dateString).format(_format);
      
      let marked = true;
      let markedDates = { 
             '2018-05-01': {selected: true, marked: true},
             '2018-05-07': {marked: true},
             '2018-05-19': {disabled: true}
            }
      if (this.state._markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        marked = !this.state._markedDates[_selectedDay].marked;
        markedDates = this.state._markedDates[_selectedDay];
      }
      
      markedDates = {...markedDates, ...{ marked }};
      
      // Create a new object using object property spread since it should be immutable
      // Reading: https://davidwalsh.name/merge-objects
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: markedDates } }
      
      // Triggers component to render again, picking up the new state
      this.setState({ _markedDates: updatedMarkedDates });
  }

  componentWillMount () {
    this.setState({
      collectMarkedDate : { 
              '2018-05-01': {selected: true, marked: true},
              '2018-05-07': {marked: true},
              '2018-05-19': {disabled: true,selected: true}
            },
        eventArr:[
          { key:moment('2018-05-01').format(_formatView),title:'bun 1',description:'public holiday'},
          { key:moment('2018-05-02').format(_formatView),title:'bun 2',description:'public holiday'},
          { key:moment('2018-05-03').format(_formatView),title:'bun 2',description:'public holiday' },
          ]
    })
  }
  
  
  render() {
    return (      
      <View>  
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      />
      <Text style={styles.header}>
        ប្រតិទិនខ្មែរ
      </Text>  
      <ScrollView>
      <Calendar
            showEventIndicators={true}            
            current={_today}
            markedDates={this.state.collectMarkedDate}         
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2018-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2018-12-31'}            
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
          onDayPress={this.onDaySelect}
          />     
          <Text style={styles.info}>
           ពត៍មានអំពីថ្ងៃនីមួយៗ
          </Text>   
         <FlatList
          data={this.state.eventArr}
          renderItem={({item}) => 
          <Text style={styles.item}>
               <Icon name="schedule"/>
               <Text style={styles.title}> {item.title} </Text>
               <Text style={styles.date}> {item.key} </Text>
               <Text style={styles.key}> {item.description} </Text>
          </Text>}
        />           
       </ScrollView> 
       <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View>
            <Text style={styles.info}>
              ពត៍មានសម្រាប់ថ្ងៃ
            </Text>   
            <View>
              <Text>Hello World!</Text>            
            </View>
          </View>
        </Modal>
      </View>
    );
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
    header: {
        fontFamily:'Khmer Os Battambang',
        textAlign: 'center',
        borderColor: '#bbb',
        color:"#ffffff",
        padding: 10,
        fontWeight: 'bold',
        fontSize:26,
        backgroundColor: '#0050D1'
    },
    info:{
      fontFamily:'Khmer Os Battambang',
        textAlign: 'left',
        borderColor: '#bbb',
        color:"#ffffff",
        padding: 10,
        fontWeight: 'bold',
        fontSize:20,
        backgroundColor: '#0050D1'
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
  item: {
    padding: 10,
    fontSize: 14,
    fontFamily:'Khmer Os Battambang',
    borderBottomWidth:1,
    borderColor:'#E5E5EB',
    backgroundColor:'#B7EBCF',
    height:'auto',
  },
    title:{
      fontFamily:'Khmer Os Battambang',
      fontSize:16,
    },
    description:{
       flex: 1,
       fontFamily:'Khmer Os Battambang',
       fontSize:12,
    },
    date:{
       fontFamily:'Khmer Os Battambang',
       fontSize:12,
    }
 
});
