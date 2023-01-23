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
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {
  CompletedSection,
  HighlightSection,
  OngoingSection,
  UpcommingSection,
} from '../../components/home';
import { Footer } from '../../components/shared';
import { useEvent } from '../../hooks/query/events-query';
import { useVenues } from '../../hooks/query/other-query';
import { useEventStore } from '../../store/events-store';
import { filterData } from '../../utils/helper';

export const Home = () => {
  const { data: EventData, isLoading, refetch } = useEvent();

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();

  const categories = [
    'workshops',
    'speaker sessions',
    'networking',
    'competitions',
    'informals',
    'highlights',
  ];
  const [venues, setVenues] = useState<string[]>([]);
  const { data: Venues } = useVenues();

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

    Venues?.map(item => {
      setVenues(prevState => [...prevState, item.name]);
    });
  }, [EventData, Venues]);

  const handleResetModal = async () => {
    setFilterCategory('');
    setFilterDay(['1', '2']);
    setFilterVenue('');
  };

  const handleDayFilter = (day: string) => {
    if (filterDay.includes(day)) {
      setFilterDay(filterDay.filter(item => item !== day));
      if (filterDay.length === 1) {
        setFilterDay(['1', '2']);
      }
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
        style={[styles.container, { paddingBottom: 60 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                refetch();
              }}
            />
          }>
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
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#4E8FB4"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <View>
                <HighlightSection highlights={EventData?.data?.highlights} />

                <OngoingSection
                  onGoingEvents={filterData(
                    onGoingEvents,
                    filterCategory,
                    filterDay,
                    filterVenue,
                  )}
                  filter={showModal}
                />

                <UpcommingSection
                  upcomingEvents={filterData(
                    upcommingEvents,
                    filterCategory,
                    filterDay,
                    filterVenue,
                  )}
                  filter={showModal}
                />

                <CompletedSection
                  completedEvents={filterData(
                    completedEvents,
                    filterCategory,
                    filterDay,
                    filterVenue,
                  )}
                  filter={showModal}
                />
              </View>
            </>
          )}
        </ScrollView>
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
      </LinearGradient>
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
