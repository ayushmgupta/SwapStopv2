import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addToWishList} from '../redux/WishListSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector(state => state.post.data);

  return (
    <ScrollView nestedScrollEnabled>
      <View style={styles.container}>
        <Text style={styles.logo}>Swap Stop</Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholderTextColor={'#111'}
            placeholder="Search items here..."
            style={styles.input}
          />
          <Image source={require('../images/search.png')} style={styles.icon} />
        </View>
        <Text style={styles.heading}>What are you looking for?</Text>
        <View style={{marginTop: 20}}>
          <FlatList
            numColumns={3}
            data={[
              {title: 'Car', icon: require('../images/car.png')},
              {title: 'Bike', icon: require('../images/bike.png')},
              {title: 'Laptop', icon: require('../images/laptop.png')},
              {title: 'Mobile', icon: require('../images/mobile.png')},
              {title: 'Furniture', icon: require('../images/furniture.png')},
              {title: 'House', icon: require('../images/house.png')},
            ]}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    navigation.navigate('ItemsByCategory', {
                      category: item.title,
                    });
                  }}>
                  <Image source={item.icon} style={styles.listIcon} />
                  <Text style={styles.listTitle}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Text style={styles.heading}>Posted Items </Text>

        <FlatList
          data={items}
          renderItem={({item, index}) => {
            return (
              <View style={[styles.item, {position: 'relative'}]}>
                <Image source={{uri: item.image}} style={styles.itemImage} />
                <View style={{marginLeft: 12}}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  <Text style={styles.itemPrice}>
                    {'₹'}
                    {item.price}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addToWishList(item));
                  }}
                  style={{position: 'absolute', top: 10, right: 10}}>
                  <Image
                    source={require('../images/heart.png')}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  logo: {
    fontSize: 28,
    fontWeight: '600',
    color: 'orange',
    marginTop: 20,
    marginLeft: 20,
  },
  searchBox: {
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '86%',
    marginLeft: 10,
    color: '#111',
  },
  icon: {
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginTop: 30,
    marginLeft: 20,
  },
  listItem: {
    width: Dimensions.get('window').width / 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEDEDEF8',
    margin: 2,
  },
  listIcon: {width: 50, height: 50},
  listTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  item: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDesc: {
    fontSize: 14,
    fontWeight: '400',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: 'green',
  },
});
