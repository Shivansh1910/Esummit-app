import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { SingleSponsor } from '../../components/others';
import { useSponsors } from '../../hooks/query/other-query';

export const Sponsors = () => {
  const { data, isLoading } = useSponsors();

  const [uniqueTag, setUniqueTag] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      data.map(item => {
        if (!uniqueTag.includes(item.tag)) {
          setUniqueTag([...uniqueTag, item.tag]);
        }
      });
    }
  }, [data]);

  return (
    <LinearGradient colors={['#BBD4E2', '#FFFFFF']} style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#4E8FB4"
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView>
          {uniqueTag.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.heading}>{item}</Text>
                <View style={styles.section}>
                  {data
                    ?.filter(e => e.tag === item)
                    .map((i, ind) => {
                      return (
                        <SingleSponsor
                          key={ind}
                          name={i.name}
                          link={i.link}
                          image={i.image}
                        />
                      );
                    })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 20,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
