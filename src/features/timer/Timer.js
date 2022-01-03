import React,{useState} from 'react'; // useState는 하나의 컴포넌트 내에 locally 저장되는 hook.
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import {ProgressBar} from 'react-native-paper';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/Sizes';
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import KeepAwake from 'react-native-keep-awake';

//const [minutes, setMinutes] = useState(25);

const DEFAULT_TIME= 0.1;
const DEFAULT_PROGRESS= 1;
const DEFAULT_ISSTARTED= false;

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
    KeepAwake.activate();

    const interval = React.useRef(null);
    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(DEFAULT_ISSTARTED);
    const [progress, setProgress] = useState(DEFAULT_PROGRESS);
    const onProgress = (progress) => {
        setProgress(progress)
    };

    const vibrate = () => {
        if(Platform.OS== 'ios') {
            // iOS-specific stuff
            const interval = setInterval(() => Vibration.vibrate(5000), 1000);
            setTimeout(() => {clearInterval(interval);}, 10000);
        }else if (Platform.OS== 'android'){
            // Android-specific stuff
            //Vibration.vibrate(10000);
        }else{
            // Other else
        }
    }

    const onEnd = () => {
        vibrate();  
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    }

    const changeTime=(min)=>{
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };
    return(
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused = {!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View style={{paddingTop:spacing.xxl}}> 
                <Text style={styles.title}>Now focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
        
            <View style={{padding: spacing.sm}}>
                <ProgressBar
                    progress={progress}
                    color='#5E83E2'
                    style={{height:10}}
                />
            </View>
            <View style={styles.buttonWrapper} >
                <Timing changeTime={changeTime} />
            </View>
            <View style={styles.buttonWrapper} >
                {!isStarted ? (
                    <RoundedButton title={isStarted?'pause':'start'} onPress={() => setIsStarted(true)} />
                ) : (
                    <RoundedButton title={isStarted?'pause':'start'} onPress={() => setIsStarted(false)} />
                )}
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton title='clear' onPress={() => clearSubject()} />
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        color:colors.white,
        textAlign:'center'
    },
    task:{
        color:colors.white,
        textAlign:'center',
        fontWeight:'bold'
    },
    countdown:{
        flex:0.5,
        alignItems:"center",
        justifyContent:'center'
    },
    buttonWrapper:{
        flex:0.3,
        flexDirection:'row',
        padding:15,
        justifyContent:'center',
        alignItems:'center'
    },
    clearSubject:{
        paddingBottom:25,
        paddingLeft:25,
    }
})