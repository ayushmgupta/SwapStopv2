import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Wishlist = () => {
  const items = useSelector(state => state.wishlist.data);
  const [itemList, setItemList] = useState(items);

  return (
    <View style={styles.container}>
      <FlatList
        style={{marginTop: 20}}
        data={itemList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.item}>
              <Image
                //   source={require('../images/placeholderImage.png')}
                source={{uri: item.image}}
                style={styles.itemImage}
              />
              <View style={{marginLeft: 12}}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
                <Text style={styles.itemPrice}>
                  {'₹'}
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
