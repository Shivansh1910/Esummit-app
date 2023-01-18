import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import { Event, Highlight } from '../../components/home';
import { Footer } from '../../components/shared';
import FilterSvg from '../../components/svgs/filter';
import { useEvent } from '../../hooks/query/events-query';
import { useEventStore } from '../../store/events-store';
import { filterData } from '../../utils/helper';

export const Home = () => {
  const { data: EventData, isLoading, refetch } = useEvent();

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState('');
  const [filterDay, setFilterDay] = useState<string[]>(['1', '2']);
  const [filterVenue, setFilterVenue] = useState('');

  const onGoingEvents = useEventStore(state => state.onGoing);
  const upcommingEvents = useEventStore(state => state.upcoming);
  const completedEvents = useEventStore(state => state.completed);
  const setOnGoingEvents = useEventStore(state => state.setOnGoing);
  const setUpcommingEvents = useEventStore(state => state.setUpcoming);
  const setCompletedEvents = useEventStore(state => state.setCompleted);

  useEffect(() => {
    const timeNow = new Date();
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
        new Date(item.startTime) < timeNow &&
        new Date(item.endTime) > timeNow
      ) {
        setOnGoingEvents(item);
      } else if (new Date(item.startTime) > timeNow) {
        setUpcommingEvents(item);
      } else if (new Date(item.endTime) < timeNow) {
        setCompletedEvents(item);
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

  const handleResetModal = async () => {
    setFilterCategory('');
    setFilterDay(['1', '2']);
    setFilterVenue('');
  };

  const handleDayFilter = day => {
    if (filterDay.includes(day)) {
      setFilterDay(filterDay.filter(item => item !== day));
    } else {
      setFilterDay([...filterDay, day]);
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#1F292F', '#000000']}
        useAngle
        angle={-128.06}
        style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <ScrollView>
              <List.Accordion
                title="Categories"
                style={styles.accordion}
                titleStyle={styles.accordionTitle}>
                <View>
                  <RadioButton.Group
                    onValueChange={newValue => setFilterCategory(newValue)}
                    value={filterCategory}>
                    {categories.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (filterCategory === item) {
                              setFilterCategory('');
                            } else {
                              setFilterCategory(item);
                            }
                          }}>
                          <View style={styles.itemList}>
                            <RadioButton value={item} />
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </List.Accordion>

              <Divider style={styles.divider} />

              <List.Accordion
                title="Venue"
                style={styles.accordion}
                titleStyle={styles.accordionTitle}>
                <View>
                  <RadioButton.Group
                    onValueChange={newValue => setFilterVenue(newValue)}
                    value={filterVenue}>
                    {venues.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (filterVenue === item) {
                              setFilterVenue('');
                            } else {
                              setFilterVenue(item);
                            }
                          }}>
                          <View style={styles.itemList}>
                            <RadioButton value={item} />
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </List.Accordion>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={handleResetModal}>
                Reset
              </Button>
              <Button mode="contained" onPress={hideModal}>
                Done
              </Button>
            </View>
          </Modal>
        </Portal>
        <ScrollView
          style={[styles.container, { marginBottom: 60 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#4E8FB4"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
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
                        isLive={
                          new Date(item.startTime) < new Date() &&
                          new Date(item.endTime) > new Date()
                        }
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
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.heading, { alignSelf: 'center' }]}>
                      ONGOING EVENTS
                    </Text>
                    <TouchableOpacity onPress={showModal}>
                      <FilterSvg />
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.events}>
                      {filterData(
                        onGoingEvents,
                        filterCategory,
                        filterDay,
                        filterVenue,
                      ).map((item, index) => (
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
                </View>
              )}

              {upcommingEvents.length > 0 && (
                <View style={styles.section}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.heading}>UPCOMING EVENTS</Text>
                    <TouchableOpacity onPress={showModal}>
                      <FilterSvg />
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.events}>
                      {filterData(
                        upcommingEvents,
                        filterCategory,
                        filterDay,
                        filterVenue,
                      ).map((item, index) => (
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
                </View>
              )}

              {completedEvents.length > 0 && (
                <View style={styles.section}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.heading}>COMPLETED EVENTS</Text>
                    <TouchableOpacity onPress={showModal}>
                      <FilterSvg />
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.events}>
                      {filterData(
                        completedEvents,
                        filterCategory,
                        filterDay,
                        filterVenue,
                      ).map((item, index) => (
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
                </View>
              )}
            </>
          )}
        </ScrollView>
      </LinearGradient>
      <View style={styles.fab}>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('1')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('1')}>
          <Text style={styles.fabButtonText}>Day 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('2')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('2')}>
          <Text style={styles.fabButtonText}>Day 2</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerStyle: {
    backgroundColor: '#BBD4E2',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get('window').width,
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 24,
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  pagerView: {
    height: 180,
  },
  events: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  accordion: {
    backgroundColor: '#DCE9F0',
  },
  accordionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#141415',
  },
  divider: {
    height: 3,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  fab: {
    position: 'absolute',
    right: 0,
    top: '45%',
    transform: [{ rotate: '270deg' }, { translateY: 30 }],
    flexDirection: 'row',
    backgroundColor: '#161616',
  },
  fabButton: {
    backgroundColor: '#46B1EE',
    borderColor: '#46B1EE',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderRadius: 0,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  fabButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    lineHeight: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});
