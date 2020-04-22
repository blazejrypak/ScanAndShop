import { deleteTrolleyListItem, updateTrolleyItem} from "../actions";
import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {Icon, ListItem} from "react-native-elements";
import Counter from "../components/Counter";
import * as React from "react";

function TrolleyScreen({ trolley, dispatch, navigation }) {
  const updateIt = (id, number) => dispatch(updateTrolleyItem(id, number));

  function onChange(number, type, id) {
    console.log("[LIST COUNTER] number: ", number, " type: ", type, " id:", id); // 1, + or -
    const result = trolley.trolleyItems.filter(item => item.id === id);
    if (!number) {
      Alert.alert(
        'Delete this item?',
        result[0].name,
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => dispatch(deleteTrolleyListItem(id))},
        ],
      );
    } else {
      updateIt(id, number);
    }
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      bottomDivider
      rightElement={() => (<View><Counter start={item.count} min={0} max={50} id={item.id} onChange={onChange.bind(this)} /></View>)}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 8, backgroundColor: 'white'}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={trolley.trolleyItems}
          renderItem={renderItem}
        />
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Icon raised reverse type='MaterialIcons' name='payment' size={35} onPress={() => navigation.navigate('PayScreen')}/>
      </View>
      <View style={{flex: 2,  backgroundColor: 'steelblue', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 20 }}>Budget</Text>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>20 €</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 20 }}>Sum</Text>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>{trolley.trolleySum} €</Text>
        </View>

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
  }
});
export default TrolleyScreen;