import React,{useState} from 'react'; // useState는 하나의 컴포넌트 내에 locally 저장되는 hook.
import { Text, View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({changeTime}) => {
    return(
        <>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="10" onPress={()=>changeTime(10)} ></RoundedButton>
            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="15" onPress={()=>changeTime(15)} ></RoundedButton>
            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="20" onPress={()=>changeTime(20)} ></RoundedButton>
            </View>
        </>
    )
}

const styles= StyleSheet.create({
    timingButton:{
        flex:1,
        alignItems:'center',
    }
})
