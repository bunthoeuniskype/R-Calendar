import React, { Component } from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {  
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView
} from 'react-native';
import moment from 'moment';
import Timeline from 'react-native-timeline-listview';
import SQLite from 'react-native-sqlite-2';
import { Button } from 'react-native-elements';

let momentInUTC = moment;

const database_name = 'AppCalendar.db'
const database_version = '1.0'
const database_displayname = 'SQLite Test Database'
const database_size = 200000;
let db;

export default class CalScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {      
       text: '',
        data:[],
        progress: []       
      };       
    }
    
    componentWillMount() {
      this.loadAndQueryDB() ;
    }
  
    shouldComponentUpdate() {        
      return true;
    }
     
    componentWillUnmount () {
      this.closeDatabase();
      this.setState({
              data:[]
        })
    }

  errorCB = (err) => {
    console.log('error: ', err)
    this.state.progress.push('Error: ' + (err.message || err))
    this.setState(this.state)
    return false
  }

  successCB = () => {
    console.log('SQL executed ...')
  }

  openCB = () => {
    this.state.progress.push('Database OPEN')
    this.setState(this.state)
  }

  closeCB = () => {
    this.state.progress.push('Database CLOSED')
    this.setState(this.state)
  }

  deleteCB = () => {
    console.log('Database DELETED')
    this.state.progress.push('Database DELETED')
    this.setState(this.state)
  }

  getEventCollection (db) {   
    db.transaction((txn) => {
      txn.executeSql(  'SELECT 1 FROM Version LIMIT 1',
        [],
        () => {  db.transaction(this.queryEvent, this.errorCB, () => { }) },
        (error) => { }
      )
    })
  }

  queryEvent = (tx) => {   
    tx.executeSql('SELECT title, time, description FROM AppEvent order by id DESC',[],
      this.queryEventSuccess, this.errorCB)
  }

  queryEventSuccess = (tx, results) => {
     this.state.progress.push('events data..')
      this.setState(this.state)
      var len = results.rows.length
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i)   
        this.state.data.push({time: row.time, title: row.title, description:row.description})
      }
      this.setState(this.state)
  }

  loadAndQueryDB () {   
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB)
    db.transaction(function (txn) {        
        txn.executeSql('CREATE TABLE IF NOT EXISTS AppEvent(id INTEGER PRIMARY KEY NOT NULL,title VARCHAR(50), time VARCHAR(30),description VARCHAR(500))', []);
     });
    this.getEventCollection(db);
  }

  closeDatabase () {
    var that = this
    if (db) {
      console.log('Closing database ...')
      that.state.progress.push('Closing database')
      that.setState(that.state)
    } else {
      that.state.progress.push('Database was not OPENED')
      that.setState(that.state)
    }
  }

  render() {  
    const { navigate } = this.props.navigation;
    const eventTitle = 'Lunch';
    const nowUTC = moment.utc();
  
    return ( 
        <View>       
        <Button    
            backgroundColor="#2089dc"       
            onPress={ () => navigate('AddEvent') }
            title="បញ្ចួលប្រតិការណ៏ថ្មី"
          /> 
        <ScrollView>          
          <Timeline
            data={this.state.data}
          />
        </ScrollView>
      </View>   
    );
  }
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

var listStyles = StyleSheet.create({
  li: {
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 15
  },
  liIndent: {
    flex: 1
  },
  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  toolbar: {
    backgroundColor: '#51c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarButton: {
    color: 'white',
    textAlign: 'center',
    flex: 1
  },
  mainContainer: {
    flex: 1
  }
})





