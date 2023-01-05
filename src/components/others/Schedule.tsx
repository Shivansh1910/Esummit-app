import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Avatar,
  List,
} from 'react-native-paper';
import {useSchedule} from '../../hooks/query/other-query';

interface IScheduleProps {
  open: any;
  setSchedule: any;
}

export const Schedule = (props: IScheduleProps) => {
  const {data: ScheduleData, isLoading} = useSchedule();

  const handleOpen = (url: string) =>{
    props.setSchedule(url)
    props.open()
  }

  return (
    <View style={styles.content1}>
      <List.Accordion
        title="OVERALL SCHEDULE"
        style={styles.accordion1}
        titleStyle={styles.accordionTitle1}
        id={1}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#4E8FB4"
            size="small"
            style={{marginTop: 20}}
          />
        ) : (
          ScheduleData?.data.map((schedule, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={()=>handleOpen(schedule.file)}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Avatar.Icon icon="file" size={30} />
                <Text style={styles.accordionAnswersText}>{schedule.name}</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  content1: {
    borderBottomWidth: 1,
    borderColor: '#4E8FB4',
  },
  accordion1: {
    backgroundColor: '#F4F8FA',
  },
  accordionTitle1: {
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
  },
  accordionAnswer: {
    borderWidth: 1,
    borderColor: '#4E8FB4',
    borderRadius: 3,
  },
  accordionAnswersText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    lineHeight: 15,
    paddingVertical: 9,
    paddingHorizontal: 22,
    textAlign: 'justify',
    color: '#000000',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    height: '100%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
