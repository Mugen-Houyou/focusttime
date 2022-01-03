import React,{useState} from 'react'; // useState는 하나의 컴포넌트 내에 locally 저장되는 hook.
import { Text, View, StyleSheet,Platform } from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSizes,spacing } from '../../utils/Sizes';

export const  Focus = ({addSubject})=> {
  const [subject,setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}> 
          <TextInput style={{ flex: 1, marginRight:spacing.md } } maxLength={50} 
            onSubmitEditing={
              ({nativeEvent}) => {
              setSubject(nativeEvent.text)
            }
            }
          />
          <RoundedButton size={40} title="+" onPress={()=>{ addSubject(subject) }} /> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 50,
  },
  titleContainer : {
    flex:0.5,
    //padding: Platform.OS==='android'?6:5,
    padding:spacing.md,
    justifyContent:'center'
  },
  title : {
    color: colors.white,
    fontWeight: "bold",
    padding: 16,
    fontSize:fontSizes.lg,
  },
  inputContainer: {
    paddingTop:spacing.md,
    flexDirection:'row',
    alignItems:'center'
  }
});
