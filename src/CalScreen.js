import React, { Component } from 'react';
import {  
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  ActivityIndicator,
  RefreshControl,YellowBox
} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import SQLite from 'react-native-sqlite-2';
import { Button,Header } from 'react-native-elements';
const database_name = 'AppCalendar.db'
const database_version = '1.0'
const database_displayname = 'SQLite Test Database'
const database_size = 200000;
let db;

export default class CalScreen extends React.Component {

    constructor(props) {
      super(props);
      YellowBox.ignoreWarnings(
          ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'      
      ]);
      this.state = {  
        isRefreshing: false,      
        waiting: false, 
        data:[],
        progress: [],
        skip:0
      };       
      this.onEndReached = this.onEndReached.bind(this)
      this.renderFooter = this.renderFooter.bind(this)
      this.onRefresh = this.onRefresh.bind(this)
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
    //console.log('SQL executed ...')
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
    //console.log('Database DELETED')
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
     olds = this.state.skip;
    tx.executeSql('SELECT title, time, description FROM AppEvent order by id DESC LIMIT :skip,3',[olds],
      this.queryEventSuccess, this.errorCB)
      this.setState({
       skip :olds+1
      })
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
      that.state.progress.push('Closing database')
      that.setState(that.state)
    } else {
      that.state.progress.push('Database was not OPENED')
      that.setState(that.state)
    }
  }

  refresh = () => {   
    this.setState({
     skip :0,
     data:[]
    })  

   this.loadAndQueryDB();
  }

  onRefresh(){
   //initail data
   this.setState({
     skip :0,
     data:[]
    })  
   this.loadAndQueryDB();
  }

  onEndReached() {     
    this.loadAndQueryDB();      
  }

  renderFooter() {
      //show loading indicator
      if (this.state.waiting) {
          return <ActivityIndicator />;
      }
  }

  render() {  
    const { navigate } = this.props.navigation;
   
    return (    
       <View style={{backgroundColor:'#ffffff',marginBottom:5,flex:1}}>
       <Header      
        placement="left"
        leftComponent={{ icon: 'arrow-back',title: 'ថ្ងៃនេះ', color: '#fff',onPress:() => this.props.navigation.goBack() }}
        centerComponent={{ text: 'ប្រតិទិនខ្មែរ', style: { color: '#fff',fontSize:18 } }}
        rightComponent={{ icon: 'bookmark', color: '#fff',onPress:() => navigate('AddEvent',{backRefresh:this.refresh.bind(this)}) }}
        outerContainerStyles={styles.header}
       />        
      
       <ScrollView style={{marginTop:15}}>          
          <Timeline
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, paddingTop: 15}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray',backgroundColor:'lightblue',padding:10,fontFamily:'khmer os battambang',borderRadius:10}}
            innerCircle={'dot'}
            separator='true'          
            options={{
              refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached
                      }}          
            data={this.state.data}
            style={{padding:15}}
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





