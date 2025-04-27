import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ItemsByCategory = () => {
  const items = useSelector(state => state.post.data);
  const route = useRoute();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    let tempData = items;
    let temp = [];
    tempData.map(item => {
      if (item.category === route.params.category) {
        temp.push(item);
      }
    });
    setItemList(temp);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{marginTop: 10}}>
        <FlatList
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
    </View>
  );
};

export default ItemsByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
