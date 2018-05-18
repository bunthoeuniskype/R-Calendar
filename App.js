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
  Modal,
  Button,
  Dimensions,
  TouchableHighlight  
} from 'react-native';
import {LocaleConfig, Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import {
  StackNavigator,
} from 'react-navigation';
import { Header } from 'react-native-elements';
import CalScreen from './src/CalScreen';

class MyListItem extends React.Component {

    constructor(props) {
      super(props);
      this.state = {      
        eventArr:this.props.listArr
      };        
     
    }
 
  render() {  
    return (   
        <ScrollView>
          <FlatList   
            data={this.state.eventArr}
            renderItem={({item}) => 
                <Text style={styles.item}>              
                <Text style={styles.date}>{item.day} </Text>
                <Text style={styles.title}> {item.title} </Text>  
                </Text >}
            keyExtractor={(item, index) => index.toString()} />       
        </ScrollView>
    );
  }
}

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
            textDayFontSize: 14,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14
}

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)
const _formatView = 'DD'
//type Props = {};

const DataArr = [
{"date":"2018-01-01","month":"1","day": "1 មករា", "title": "ចូលឆ្នាំសកល"},
{"date":"2018-01-07","month":"1","day": "7 មករា", "title": "ទិវាជ័យជំនះ៧មករា"},
{"date":"2018-01-31","month":"1","day": "31 មករា", "title": "ពិធីបុណ្យមាឃបូជា"},
{"date":"2018-03-08","month":"3","day": "8 មីនា", "title": "ទិវានារីអន្តរជាតិ"},
{"date":"2018-04-14","month":"4","day": "14 មេសា", "title": "ចូលឆ្នាំចសំរិទ្ធស័ក្ក"},
{"date":"2018-04-15","month":"4","day": "15 មេសា", "title": "វិរះវនបត"},
{"date":"2018-04-16","month":"4","day": "16 មេសា", "title": "វិរះឡើងស័ក"},
{"date":"2018-04-29","month":"4","day": "29 មេសា", "title": "ពិធីបុណ្យវិសាខបូជា"},
{"date":"2018-05-01","month":"5","day": "1 ឧសភា", "title": "ទិវាពលកម្មអន្តរជាតិឺ"},
{"date":"2018-05-03","month":"5","day": "3 ឧសភា", "title": "ច្រត់ព្រះនង្គ័ល"},
{"date":"2018-05-13","month":"5","day": "13 ឧសភា", "title": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្នព្រះមហាក្សត្រ"},
{"date":"2018-05-14","month":"5","day": "14 ឧសភា", "title": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្នព្រះមហាក្សត្រ"},
{"date":"2018-05-15","month":"5","day": "15 ឧសភា", "title": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្នព្រះមហាក្សត្រ"},
{"date":"2018-06-01","month":"6","day": "1 មិថុនា", "title": "ទិវាកុមារអន្តរជាតិ"},
{"date":"2018-06-18","month":"6","day": "18 មិថុនា", "title": "ពិធីបុណ្យចម្រើនព្រះជន្នស្តេចម៉ែ"},
{"date":"2018-09-24","month":"9","day": "24 កញ្ញា", "title": "ទិវាប្រកាសប្រើរដ្ឋធម្មនុញ្ញ"},
{"date":"2018-10-08","month":"10","day": "8 តុលា", "title": "ពិធីបុណ្យភ្ជុំបិណ្ឌ"},
{"date":"2018-10-09","month":"10","day": "9 តុលា", "title": "ពិធីបុណ្យភ្ជុំបិណ្ឌ"},
{"date":"2018-10-10","month":"10","day": "10 តុលា", "title": "ពិធីបុណ្យភ្ជុំបិណ្ឌ"},
{"date":"2018-10-15","month":"10","day": "15 តុលា", "title": "គោរពវិ.ព្រះបរមរតនកោដ្ធ"},
{"date":"2018-10-23","month":"10","day": "23 តុលា", "title": "សន្តិសញ្ញាសន្តិភាពទីក្រុងប៉ារីស"},
{"date":"2018-10-29","month":"10","day": "29 តុលា", "title": "ទិវារាជភិសេកព្រះករុណាព្រះបាទសម្តេចព្រះបរមនាថនរោត្តមសីហមុនី"},
{"date":"2018-11-09","month":"11","day": "9 វិច្ឆិកា", "title": "ទិវាបុណ្យឯករាជ្យ"},
{"date":"2018-11-21","month":"11","day": "21 វិច្ឆិកា", "title": "ព្រះរាជពិធីបុណ្យអុំទូក"},
{"date":"2018-11-22","month":"11","day": "22 វិច្ឆិកា", "title": "ព្រះរាជពិធីបុណ្យអុំទូក"},
{"date":"2018-11-23","month":"11","day": "23 វិច្ឆិកា", "title": "ព្រះរាជពិធីបុណ្យអុំទូក"},
{"date":"2018-12-10","month":"12","day": "10 ធ្នូ", "title": "ទិវាសិទិ្ធមនុស្សអន្តរជាតិ"}
];


const vacation = {key:'vacation', color: 'gray', selectedDotColor: 'blue'};
const DataObj = {
"2018-01-01":{dots: [vacation],selected:true,marked: true},
"2018-01-07":{dots: [vacation],selected:true,marked: true},
"2018-01-31":{dots: [vacation],selected:true,marked: true},
"2018-03-08":{dots: [vacation],selected:true,marked: true},
"2018-04-14":{dots: [vacation],selected:true,marked: true},
"2018-04-15":{dots: [vacation],selected:true,marked: true},
"2018-04-16":{dots: [vacation],selected:true,marked: true},
"2018-04-29":{dots: [vacation],selected:true,marked: true},
"2018-05-01":{dots: [vacation],selected:true,marked: true},
"2018-05-03":{dots: [vacation],selected:true,marked: true},
"2018-05-13":{dots: [vacation],selected:true,marked: true},
"2018-05-14":{dots: [vacation],selected:true,marked: true},
"2018-05-15":{dots: [vacation],selected:true,marked: true},
"2018-06-01":{dots: [vacation],selected:true,marked: true},
"2018-06-18":{dots: [vacation],selected:true,marked: true},
"2018-09-24":{dots: [vacation],selected:true,marked: true},
"2018-10-08":{dots: [vacation],selected:true,marked: true},
"2018-10-09":{dots: [vacation],selected:true,marked: true},
"2018-10-10":{dots: [vacation],selected:true,marked: true},
"2018-10-15":{dots: [vacation],selected:true,marked: true},
"2018-10-23":{dots: [vacation],selected:true,marked: true},
"2018-10-29":{dots: [vacation],selected:true,marked: true},
"2018-11-09":{dots: [vacation],selected:true,marked: true},
"2018-11-21":{dots: [vacation],selected:true,marked: true},
"2018-11-22":{dots: [vacation],selected:true,marked: true},
"2018-11-23":{dots: [vacation],selected:true,marked: true},
"2018-12-10":{dots: [vacation],selected:true,marked: true},
};

const ArrEvent = [];
//const  eventArr=[];
class AppHome extends React.Component {

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
       ArrEvent:[],
       status:false,
       _today:_today
    };   
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onDaySelect = (day) => {
      this.setModalVisible(true);
      const _selectedDay = moment(day.dateString).format(_format);
      
      let marked = true;
      let markedDates = DataObj;
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
     
    let thisMonth =  moment(day.dateString).format('M');
   
    let tempArray = []; // need to declare here
    DataArr.forEach(function(k, v, arr){
          if(thisMonth==k.month){
            tempArray.push({date:k.date,day:k.day,title:k.title});  
          }       
    });
  
   this.setState({ _markedDates: updatedMarkedDates, ArrEvent:tempArray });  
  }

  componentWillMount () {

    let thisMonth =  moment(_today).format("M");
    let tempArray = []; // need to declare here
    DataArr.forEach(function(k, v, arr){
          if(thisMonth==k.month){
            tempArray.push({date:k.date,day:k.day,title:k.title});  
          }               
    });
  
    this.setState({
       collectMarkedDate : DataObj    
    })

    this.setState({
      eventArr:tempArray
    })
   this.state.ArrEvent=tempArray
  }
  
  onMonthSelect(month){    
  
  } 

    onToday(){    
      this.setState({
        _today:_today
      })
    } 

   componentDidMount() {
        SplashScreen.hide();
    }
  
   shouldComponentUpdate() {        
      return true;
    }

   componentWillUnmount(){
      
    }

  render() {
    const { navigate } = this.props.navigation;
    return (      
      <View>  
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      /> 
      <Header      
        placement="left"
        leftComponent={{ icon: 'event',title: 'ថ្ងៃនេះ', color: '#fff',onPress:() => this.onToday() }}
        centerComponent={{ text: 'ប្រតិទិនខ្មែរ', style: { color: '#fff',fontSize:18 } }}
        rightComponent={{ icon: 'book', color: '#fff',onPress:() => navigate('CalAddNotification') }}
        outerContainerStyles={styles.header}
      />  
    
      <ScrollView>
      <Calendar
            showEventIndicators={true}            
            current={this.state._today}
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
            onMonthChange={(month) => { this.onMonthSelect(month) }}
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
          onSwipeNext={addMonth => addMonth()}   // Callback for forward swipe event
          onSwipePrev={substractMonth => substractMonth()}    // Callback for back swipe event
          onTouchNext={addMonth => addMonth()}   // Callback for next touch event
          onTouchPrev={substractMonth => substractMonth()}      // Callback for prev touch event
          onTitlePress={this.onTitlePress}  // Callback on title press        
          customStyle={customStyle}  
          onDayPress={this.onDaySelect}
          markingType={'multi-dot'}
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
               ពត៍មានអំពីថ្ងៃនីមួយៗ
            </Text>               
            </View>           
            <View>
               <MyListItem  
                  listArr={this.state.ArrEvent}
                />     
             <TouchableHighlight 
                style={styles.btnModel}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>ត្រឡប់ក្រោយ</Text>
              </TouchableHighlight>        
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
     circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor: 'red'
    },  
   calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height:'auto',
        width:'100%',
        paddingBottom:10,
    },
    headertitle:{
      fontFamily:'Khmer Os Battambang',
      textAlign: 'center',
      borderColor: '#bbb',
      color:"#ffffff",
      padding: 10,
      fontWeight: 'bold',
      fontSize:26,
    },
    header: {    
        backgroundColor: '#0050D1'
    },
    info:{     
      fontFamily:'Khmer Os Battambang',
        textAlign: 'left',
        borderColor: '#bbb',
        color:"#ffffff",
        padding: 10,
        fontWeight: 'bold',
        fontSize:18,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,   
    borderBottomWidth:1,
    borderColor:'#E5E5EB',
    backgroundColor:'#B7EBCF',
    height:'auto',
  },
    title:{    
      color:'blue', 
      fontFamily:'Khmer Os Battambang',
      fontSize:14,
    },
    description:{
       flex: 1,
       fontFamily:'Khmer Os Battambang',
       fontSize:12,
    },
    date:{
       padding:4,
       backgroundColor:'red',
       width: 35,
       height: 35,
       borderRadius: 35/2,
       fontFamily:'Khmer Os Battambang',
       fontWeight:'bold',
       color:'white',
       fontSize:16,
    },
    btnModel:{       
       backgroundColor:'#E51010',
       padding:10,      
       alignItems:'center',  
    }
 
});

const MainApp = StackNavigator({
  Home : {screen:AppHome,navigationOptions:{ header: null }},
  CalAddNotification:{screen:CalScreen,navigationOptions:{ title: 'ប្រតិទិនខ្មែរ',color:'#ffffff',backgroundColor:'#0050D1',fontFamily:'Khmer Os Battambang' }}
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainApp style={{ width: Dimensions.get("window").width }} />
      </View>
    );
  }
}