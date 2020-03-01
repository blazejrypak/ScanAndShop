import {Text, View, StyleSheet, FlatList} from "react-native";
import * as React from "react";
import {ListItem, Input, Icon} from "react-native-elements";
import Counter from "../components/Counter";
import {updateShoppingListItem, changeInputItemName, addShoppingListItem} from "../actions";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function ShoppingListScreen({ shoppingList, dispatch, navigation }) {
  const updateIt = (id, number) => dispatch(updateShoppingListItem(id, number));

  function onChange(number, type, id) {
    console.log("[SHOPPING LIST COUNTER] number: ", number, " type: ", type, " id:", id); // 1, + or -
    updateIt(id, number);
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      bottomDivider
      rightElement={() => (<View><Counter start={item.count} min={1} max={50} id={item.id} onChange={onChange.bind(this)} /></View>)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.addItem}>
        <Input
          style={{ flex: 1 }}
          placeholder="Enter item"
          value={shoppingList.inputItemName}
          onChangeText={(text => dispatch(changeInputItemName(text)))}
          rightIcon={<Icon type='entypo' name='add-to-list' size={30} onPress={() => dispatch(addShoppingListItem(shoppingList.inputItemName, 1))}/>}
        />
      </View>
      <View style={styles.shoppingList}>
        <FlatList
          keyExtractor={keyExtractor}
          data={shoppingList.shoppingList}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  addItem: {
    // flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'row'
  },
  shoppingList: {
    flex: 8,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});