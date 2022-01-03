import React, {useState,useEffect} from 'react'; // useState는 하나의 컴포넌트 내에 locally 저장되는 hook.
import { Text, View,StyleSheet,Platform } from 'react-native';
import {Focus} from './src/features/focus/Focus'
import {FocusHistory} from './src/features/focus/FocusHistory'
import {Timer} from './src/features/timer/Timer'
import { colors } from './src/utils/colors';
import { fontSizes,spacing } from './src/utils/Sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory ] = useState( [] );
  const [appInited,setAppInited] = useState(false);
  const STATUSES = {
    COMPLETE:0,
    CANCELED:1
  };

  const addFocusHistorySubjectWithState=(subject,status)=>{
    setFocusHistory([...focusHistory,{key:String(focusHistory.length+1), subject: subject, status: status }])
  }

  const onClear= ()=>{
    //things to do
    setFocusHistory([]);
    console.log(focusHistory);
  }

  const saveFocusHistory=async ()=>{
    if(appInited==false) {console.log(appInited);return};
    try{
      console.log('saved: ')
      console.log(JSON.stringify(focusHistory));
      AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory));
    }catch(e){
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        console.log('loaded: ')
        console.log(JSON.parse(history));
        setFocusHistory(JSON.parse(history));
      }
      else{
        console.log('loaded but JSON.parse(history).length is: '+JSON.parse(history).length)
      };
    } catch (e) {
      console.log(e);
    } 
  };

  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory]);

  useEffect(()=>{
    console.log('ITEM MOUNTED');
    setAppInited(true);
    loadFocusHistory();
  },[]); // ==> 마지막에 빈 배열 []일 경우, it just runs on the mount of the component.

  return (
    <View style={styles.container}>
      {/* Focus 객체 */}
      {focusSubject?( 
        <Timer 
          focusSubject={focusSubject}  
          onTimerEnd={()=>{
            addFocusHistorySubjectWithState(focusSubject,STATUSES.COMPLETE)
            setFocusSubject(null);
          }} 
          clearSubject={()=>{
            addFocusHistorySubjectWithState(focusSubject,STATUSES.CANCELED)
            setFocusSubject(null);
          }}
        />

      ): (<>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={ onClear} />
      </>)
      }
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    backgroundColor: '#252250' 
  }
});
