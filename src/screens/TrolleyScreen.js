import {deleteTrolleyListItem, getTrolley, getTrolleyItems, updateTrolleyItem} from "../actions";
import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Card, Divider, Icon, ListItem} from "react-native-elements";
import Counter from "../components/Counter";
import * as React from "react";
import {strings} from "../locales/i18n";
import {Table, Row, Rows, TableWrapper, Col, Cell, Cols} from 'react-native-table-component';
import {Component} from "react";
import TouchableItem from "@react-navigation/stack/src/views/TouchableItem";
import {MaterialCommunityIcons} from "@expo/vector-icons";


class BottomTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        flex: 2,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
      }}>
        <View style={{position: 'absolute', alignSelf: 'center', bottom: 5}}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ScannerScreen')}>
            <Icon raised reverse type='MaterialIcons' name='filter-center-focus' size={40} color='green'/>
          </TouchableWithoutFeedback>
        </View>

        <View style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: 150
        }}
        >
            <View style={{flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{fontSize: 15}}>{strings('trolley.budget')}</Text>
              <Text style={{fontSize: 15, fontWeight: "bold"}}>20 €</Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Checkout')}>
                <Icon raised type='MaterialIcons' name='shopping-cart' size={25} color='green'/>
              </TouchableWithoutFeedback>
            </View>
          <View style={{flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{fontSize: 15}}>{strings('trolley.sum')}</Text>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>10 €</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ScannerScreen')}>
              <Icon raised type='MaterialIcons' name='delete' size={25} color='green'/>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}


function TrolleyScreen({trolley, jwt, dispatch, navigation}) {
  const updateIt = (id, number) => {
    dispatch(updateTrolleyItem(id, number));
  }

  function onChange(number, type, id) {
    console.log("[LIST COUNTER] number: ", number, " type: ", type, " id:", id); // 1, + or -
    const result = trolley.trolleyItems.filter(item => item.id === id);
    if (!number) {
      Alert.alert(
        strings('delete_this_item'),
        result[0].name,
        [
          {text: strings('cancel'), onPress: () => updateIt(id, 1), style: 'cancel'},
          {text: strings('approve'), onPress: () => dispatch(deleteTrolleyListItem(id))},
        ],
      );
    } else {
      updateIt(id, number);
    }
  }

  const keyExtractor = (item, index) => index.toString()

  const tableHead = ['Price', 'Sale', 'Sum'];
  let rowData = (price, sale, quantity) => {
    return [
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{price}</Text>,
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: 'red'}}>{sale}</Text>,
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{quantity}</Text>
    ];
  }

  const renderItem = ({item}) => (
    <View>
      <Card>
        <ListItem
          title={item.name}
          titleStyle={{fontSize: 27}}
          bottomDivider
          rightElement={() => (
            <View><Counter start={item.quantity} min={0} max={50} id={1} onChange={onChange.bind(this)}/></View>)}
        />
        <Table borderStyle={{borderColor: 'black'}}>
          <Row data={tableHead} flexArr={[1, 1, 2]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Row data={rowData(item.price, item.sale, item.quantity)} flexArr={[1, 1, 2]}/>
          </TableWrapper>
        </Table>
      </Card>
    </View>
  );

  if (trolley.trolleyId === null) {
    dispatch(getTrolley(jwt));
  }
  const testTrolleyItems = [
    {
      "name": "hello",
      "price": 2.32,
      "sale": 0.01,
      "quantity": 1,
      "sum" : 2.32
    },
    {
      "name": "hello",
      "price": 2.32,
      "sale": 0.01,
      "quantity": 1,
      "sum" : 2.32
    },
    {
      "name": "hello",
      "price": 2.32,
      "sale": 0.01,
      "quantity": 1,
      "sum" : 2.32
    },
    {
      "name": "hello",
      "price": 2.32,
      "sale": 0.01,
      "quantity": 1,
      "sum" : 2.32
    },
  ]
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 8, backgroundColor: 'white'}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={testTrolleyItems}
          renderItem={renderItem}
        />
      </View>
      <BottomTab navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textStyle: {
    color: '#FFFFFF'
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  tableContainer: {
    flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'
  },
  head: {
    height: 20,
    backgroundColor: 'green'
  },
  wrapper: {flex: 1},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 'auto'},
  text: {textAlign: 'center', color: 'white', fontWeight: 'bold'}
});
export default TrolleyScreen;