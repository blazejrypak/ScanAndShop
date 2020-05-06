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
        <View style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: 150
        }}
        >
            <View style={{flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{fontSize: 15}}>{strings('trolley.count_trolley_items')}</Text>
              <Text style={{fontSize: 15, fontWeight: "bold"}}>{this.props.trolley.trolleyItems.length} items</Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Checkout')}>
                <Icon raised type='MaterialIcons' name='shopping-cart' size={25} color='green'/>
              </TouchableWithoutFeedback>
            </View>
          <View style={{flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{fontSize: 15}}>{strings('trolley.sum')}</Text>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>{this.props.trolley.trolleySum} €</Text>
            <TouchableWithoutFeedback onPress={() => this.props.handleRemoveTrolleyItem()}>
              <Icon raised type='MaterialIcons' name='delete' size={25} color='green'/>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', bottom: 5 }} onPress={() => this.props.navigation.navigate('ScannerScreen')}>
          <Icon raised reverse type='MaterialIcons' name='filter-center-focus' size={40} color='green'/>
        </TouchableOpacity>
      </View>
    );
  }
}


function ShoppingScreen({trolley, jwt, dispatch, navigation}) {
  if (trolley.trolleyId === null){
    dispatch(getTrolley(jwt)); // get new trolley
  }

  function onChange(number, type, id) {
    console.log("[LIST COUNTER] number: ", number, " type: ", type, " id:", id); // 1, + or -
    dispatch(updateTrolleyItem(id, number));
  }

  const tableHead = ['Price', 'discount', 'Sum'];
  let rowData = (price, discount, sum) => {
    return [
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{price}</Text>,
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: 'red'}}>{discount}</Text>,
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{sum}</Text>
    ];
  }
  const getItem = () => {
    for (let i = 0; i < trolley.trolleyItems.length; i++) {
        if (trolley.trolleyItems[i].id === trolley.itemDetails_id) {
          return trolley.trolleyItems[i];
        }
    }
    return undefined;
  }
  function handleRemoveTrolleyItem() {
    dispatch(deleteTrolleyListItem(item.id))
  }

  const item = getItem();

  const getSum = () => {
    return (item.quantity * (item.price - item.discount)).toFixed(2);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 8, backgroundColor: 'white'}}>
        {item !== undefined &&
        <Card>
          <ListItem
            title={item.name}
            titleStyle={{fontSize: 27}}
            bottomDivider
            rightElement={() => (
              <View><Counter start={item.quantity} min={1} max={50} id={item.id}
                             onChange={onChange.bind(this)}/></View>)}
          />
          <Table borderStyle={{borderColor: 'black'}}>
            <Row data={tableHead} flexArr={[1, 1, 2]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
              <Row data={rowData(item.price, item.discount, getSum())} flexArr={[1, 1, 2]}/>
            </TableWrapper>
          </Table>
        </Card>
        }
      </View>
      <BottomTab navigation={navigation} handleRemoveTrolleyItem={handleRemoveTrolleyItem.bind(this)} trolley={trolley}/>
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
  wrapper: {
  },
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 'auto'},
  text: {textAlign: 'center', color: 'white', fontWeight: 'bold'}
});
export default ShoppingScreen;