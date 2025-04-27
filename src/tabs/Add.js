import {
  Dimensions,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {addPost} from '../redux/PostSlice';

const Add = ({onPost}) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState({
    assets: [
      {
        type: 'image/jpeg',
        height: '',
        width: '',
        fileName: '',
        fileSize: '',
        uri: '',
      },
    ],
  });
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [selectCategory, setSelectedCategory] = useState('');

  console.log('photo,price,name,desc', photo, price, name, desc);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
        openCamera();
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (!result.didCancel) {
      setPhoto(result);
    }
  };

  const addItem = () => {
    dispatch(
      addPost({
        name: name,
        price: price,
        desc: desc,
        image: photo.assets[0].uri,
        category:
          selectCategory === 0
            ? 'Car'
            : selectCategory === 1
            ? 'Bike'
            : selectCategory === 2
            ? 'Laptop'
            : selectCategory === 3
            ? 'Mobile'
            : selectCategory === 4
            ? 'Furniture'
            : selectCategory === 5
            ? 'House'
            : '',
      }),
    );
    onPost();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Post</Text>
      </View>
      <TouchableOpacity
        style={styles.imageView}
        onPress={() => {
          requestCameraPermission();
        }}>
        {photo.assets[0].uri == '' ? (
          <Image
            resizeMode="contain"
            source={require('../images/uploadImage.png')}
            style={styles.imageView}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={{uri: photo.assets[0].uri}}
            style={styles.imageView}
          />
        )}
      </TouchableOpacity>
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Enter Item Name"
        style={[styles.input, {marginTop: 40}]}
        value={name}
        onChangeText={e => {
          setName(e);
        }}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Enter Item Description"
        style={styles.input}
        value={desc}
        onChangeText={e => {
          setDesc(e);
        }}
      />
      <TextInput
        placeholderTextColor={'grey'}
        keyboardType="number-pad"
        placeholder="Enter Item Price"
        style={styles.input}
        value={price}
        onChangeText={e => {
          setPrice(e);
        }}
      />
      <Text style={[styles.title, {marginTop: 20, marginLeft: 20}]}>
        Choose Category
      </Text>
      <View style={styles.tileRow}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(0);
          }}
          style={[
            styles.categoryTile,
            {
              borderColor: selectCategory === 0 ? 'green' : 'transparent',
            },
          ]}>
          <Text>Car</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(1);
          }}
          style={[
            styles.categoryTile,
            {borderColor: selectCategory === 1 ? 'green' : 'transparent'},
          ]}>
          <Text>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(2);
          }}
          style={[
            styles.categoryTile,
            {borderColor: selectCategory === 2 ? 'green' : 'transparent'},
          ]}>
          <Text>Laptop</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tileRow}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(3);
          }}
          style={[
            styles.categoryTile,
            {borderColor: selectCategory === 3 ? 'green' : 'transparent'},
          ]}>
          <Text>Mobile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(4);
          }}
          style={[
            styles.categoryTile,
            {borderColor: selectCategory === 4 ? 'green' : 'transparent'},
          ]}>
          <Text>Furniture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(5);
          }}
          style={[
            styles.categoryTile,
            {borderColor: selectCategory === 5 ? 'green' : 'transparent'},
          ]}>
          <Text>House</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text onPress={addItem} style={styles.btnText}>
          Post Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  imageView: {
    width: '90%',
    height: 140,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 20,
    color: '#000',
  },
  btn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  categoryTile: {
    height: 40,
    width: Dimensions.get('window').width / 4,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEDEDEF8',
    borderWidth: 2,
  },
  tileRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // flex: 1,
  },
});
