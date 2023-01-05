import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import {
  ActivityIndicator,
  Button,
  FAB,
  List,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import { Event, Highlight } from '../../components/home';
import { Footer, Navbar } from '../../components/shared';
import LiveSvg from '../../components/svgs/live';
import { useEvent } from '../../hooks/query/events-query';
import { useEventStore } from '../../store/events-store';

export const Landing = () => {
  const { data: EventData, isLoading, refetch } = useEvent();

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  const navigation = useNavigation();

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [filterVenue, setFilterVenue] = useState('');

  const onGoingEvents = useEventStore(state => state.onGoing);
  const upcommingEvents = useEventStore(state => state.upcoming);
  const completedEvents = useEventStore(state => state.completed);
  const setOnGoingEvents = useEventStore(state => state.setOnGoing);
  const setUpcommingEvents = useEventStore(state => state.setUpcoming);
  const setCompletedEvents = useEventStore(state => state.setCompleted);

  useEffect(() => {
    EventData?.data?.other.forEach(item => {
      if (!categories.includes(item.category)) {
        setCategories([...categories, item.category]);
      }
      if (!days.includes(item.day)) {
        setDays([...days, item.day]);
      }
      if (!venues.includes(item.venue)) {
        setVenues([...venues, item.venue]);
      }

      if (
        new Date(item.startTime) < new Date() &&
        new Date(item.endTime) > new Date()
      ) {
        setOnGoingEvents([...onGoingEvents, item]);
      } else if (new Date(item.startTime) > new Date()) {
        setUpcommingEvents([...upcommingEvents, item]);
      } else if (new Date(item.endTime) < new Date()) {
        setCompletedEvents([...completedEvents, item]);
      }
    });

    EventData?.data?.highlights.forEach(item => {
      if (!categories.includes(item.category)) {
        setCategories([...categories, item.category]);
      }
      if (!days.includes(item.day)) {
        setDays([...days, item.day]);
      }
      if (!venues.includes(item.venue)) {
        setVenues([...venues, item.venue]);
      }
    });
  }, [EventData]);

  return (
    <>
      <LinearGradient colors={['#BBD4E2', '#FFFFFF']} style={styles.container}>
        <Navbar navigation={navigation} />

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <List.Accordion title="Categories">
              <View>
                <RadioButton.Group
                  onValueChange={newValue => setFilterCategory(newValue)}
                  value={filterCategory}>
                  {categories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setFilterCategory(item)}>
                        <View
                          style={{
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton value={item} />
                          <Text>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </View>
            </List.Accordion>

            <List.Accordion title="Days">
              <View>
                <RadioButton.Group
                  onValueChange={newValue => setFilterDay(newValue)}
                  value={filterDay}>
                  {days.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setFilterDay(item)}>
                        <View
                          key={index}
                          style={{
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton value={item} />
                          <Text>Day {item}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </View>
            </List.Accordion>

            <List.Accordion title="Venue">
              <View>
                <RadioButton.Group
                  onValueChange={newValue => setFilterVenue(newValue)}
                  value={filterVenue}>
                  {venues.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setFilterVenue(item)}>
                        <View
                          key={index}
                          style={{
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton value={item} />
                          <Text>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </View>
            </List.Accordion>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 10,
                paddingVertical: 5,
              }}>
              <Button mode="contained">Reset</Button>
              <Button mode="contained">Done</Button>
            </View>
          </Modal>
        </Portal>

        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#4E8FB4"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <ScrollView
            style={{ marginBottom: 60 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  refetch();
                }}
              />
            }>
            <View style={styles.section}>
              <Text style={styles.heading}>HIGHLIGHT SESSIONS</Text>

              <PagerView style={styles.pagerView} initialPage={0}>
                {EventData?.data?.highlights.map((item, index) => (
                  <View key={index}>
                    <Highlight
                      url={item.image}
                      alt={item.name}
                      index={index}
                      length={EventData?.data.highlights.length}
                    />
                  </View>
                ))}
              </PagerView>
            </View>

            {onGoingEvents.length > 0 && (
              <View style={styles.section}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, { alignSelf: 'center' }]}>
                    ONGOING EVENTS
                  </Text>
                  <LiveSvg />
                </View>
                <View style={styles.events}>
                  {onGoingEvents.map((item, index) => (
                    <Event
                      key={index}
                      id={item.id}
                      url={item.image}
                      event={item.name}
                      description={item.description}
                      venue={item.venue}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      navigation={navigation}
                    />
                  ))}
                </View>
              </View>
            )}

            {upcommingEvents.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.heading}>UPCOMING EVENTS</Text>
                <View style={styles.events}>
                  {upcommingEvents.map((item, index) => (
                    <Event
                      key={index}
                      id={item.id}
                      url={item.image}
                      event={item.name}
                      description={item.description}
                      venue={item.venue}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      navigation={navigation}
                    />
                  ))}
                </View>
              </View>
            )}

            {completedEvents.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.heading}>COMPLETED EVENTS</Text>
                <View style={styles.events}>
                  {completedEvents.map((item, index) => (
                    <Event
                      key={index}
                      id={item.id}
                      url={item.image}
                      event={item.name}
                      description={item.description}
                      venue={item.venue}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      navigation={navigation}
                    />
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}
        <FAB
          icon="filter"
          style={styles.fab}
          onPress={() => {
            setVisible(true);
          }}
        />

        <Footer navigation={navigation} />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerStyle: {
    backgroundColor: 'white',

    width: '70%',
    alignSelf: 'center',
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 24,
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
  },
  pagerView: {
    height: 180,
  },
  events: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 10,
  },
});
