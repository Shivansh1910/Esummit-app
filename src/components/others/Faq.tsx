import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';
import { useFaq } from '../../hooks/query/other-query';

export const Faq = () => {
  const { data: FaqData, isLoading } = useFaq();

  return (
    <View style={styles.content}>
      <Text style={styles.title}>FREQUENTLY ASKED QUESTIONS (FAQs)</Text>

      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#4E8FB4"
          size="small"
          style={{ marginTop: 20 }}
        />
      ) : (
        FaqData?.data.map((faq, index) => (
          <View style={styles.m4} key={index}>
            <List.Accordion
              title={faq.question}
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              titleNumberOfLines={3}
              id={1}
              right={props => (
                <List.Icon
                  {...props}
                  icon={props.isExpanded ? 'chevron-up' : 'chevron-down'}
                  color="#FFFFFF"
                />
              )}>
              <View style={styles.accordionAnswer}>
                <Text style={styles.accordionAnswersText}>{faq.answer}</Text>
              </View>
            </List.Accordion>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  m4: {
    marginTop: 20,
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
  accordion: {
    backgroundColor: '#222324',
  },
  accordionTitle: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    lineHeight: 18,
  },
  accordionAnswer: {
    borderWidth: 1,
    borderColor: '#222324',
    borderRadius: 3,
    backgroundColor: '#222324',
  },
  accordionAnswersText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 15,
    paddingVertical: 9,
    paddingHorizontal: 22,
    color: '#D3D3D3',
    textAlign: 'justify',
  },
});
