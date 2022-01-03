import React ,{useState, useEffect} from 'react';
import { Text, View, StyleSheet,Platform } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes,spacing } from '../utils/Sizes';

//const minutesToMillis = (min) => {return(min*1000*60)};
const minutesToMillis = (min) => min*1000*60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
    minutes = 0.1,
    isPaused,
    onStart = () => {},
    onPause = () => {},
    onProgress,
    onEnd,  
}) => {

    const [millis, setMillis] = useState(minutesToMillis(minutes))
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    const interval = React.useRef(null)
    const countDown = () => {
        setMillis((time) => {
            if (time===0) {
                // do more stuff here.
                clearInterval(interval.current);
                onEnd();
                return time;
            }
            const timeLeft = time-1000;
            // do some stuff here... i.e. reporting the progress
            return timeLeft;
        })
    }
    useEffect(()=>{
        setMillis(minutesToMillis(minutes))
    }, [minutes]);

    useEffect(()=>{
        onProgress(millis/minutesToMillis(minutes));
        if(millis===0) onEnd(); 
    }, [millis]);

    useEffect(()=>{
        if (isPaused) {
          onPause();
          if (interval.current) clearInterval(interval.current);
          return;
        }
        interval.current = setInterval( countDown, 1000)
        return () => clearInterval(interval.current)
    }, [isPaused]);

    return(
        <Text style={styles.text}>
            {formatTime(minute)}:{formatTime(seconds)}
        </Text>
    )
}

const styles= StyleSheet.create({
    text:{
        fontSize:fontSizes.xxxl,
        fontWeight:'bold',
        color:colors.white,
        padding:spacing.lg,
        backgroundColor:'rgba(94,132,226,0.3)'
    }
})
