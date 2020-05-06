import {deleteTrolleyListItem, getTrolley, getTrolleyItems, updateTrolleyItem} from "../actions";
import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Button, Card, Divider, Icon, ListItem} from "react-native-elements";
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
            <Icon raised type='MaterialIcons' name='shopping-cart' size={25} color='green'/>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{fontSize: 15}}>{strings('trolley.sum')}</Text>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>10 €</Text>
            <Icon raised type='MaterialIcons' name='delete' size={25} color='green'/>
          </View>
        </View>
      </View>
    );
  }
}


function CheckoutScreen({trolley, jwt, dispatch, navigation}) {
  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({item}) => (
    <View>
      <Card>
        <ListItem
          title={item.name}
          titleStyle={{fontSize: 27}}
          rightElement={() => (
            <View><Text>{item.price}</Text></View>)}
        />
      </Card>
    </View>
  );

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
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
        <Button
          title="Checkout"
          buttonStyle={{ backgroundColor: 'green' }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => navigation.navigate('PayScreen')}
        />
      </View>
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
export default CheckoutScreen;