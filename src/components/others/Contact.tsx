import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ActivityIndicator, List } from 'react-native-paper';
import { useContact } from '../../hooks/query/other-query';
import { SingleContact } from './SingleContact';

export const Contact = () => {
  const { data: ContactData, isLoading } = useContact();

  return (
    <View style={styles.content1}>
      <List.Accordion
        title="EMERGENCY CONTACTS"
        style={styles.accordion1}
        titleStyle={styles.accordionTitle1}
        id={1}>
        <View style={styles.accordionAnswer}>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#4E8FB4"
              size="small"
              style={{ marginTop: 20 }}
            />
          ) : (
            ContactData?.data.map(contact => (
              <SingleContact
                key={contact.name}
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                image={contact.image}
              />
            ))
          )}
        </View>
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
});
