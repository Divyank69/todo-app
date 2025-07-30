// components/CategoryList.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import categorystyles from '../../styles/CategoriesList';
import { TodoItem } from '../../types/todo';


type categoryListprops={
    todos:TodoItem[];
}

const categories = [
  { id: '1', name: 'Inbox', color: '#EBEFF5' },
  { id: '2', name: 'Work', color: '#61DEA4' },
  { id: '3', name: 'Shopping', color: '#F45E6D' },
  { id: '4', name: 'Family', color: '#FFE761' },
  { id: '5', name: 'Personal', color: '#B678FF' },
];

const CategoryList = ({todos}: categoryListprops) => {

    const getCount=(categoryName: string)=>{
      return todos.filter(todo=> todo.category === categoryName).length;
    }

  return (
    <View style={categorystyles.container}>
      <Text style={categorystyles.heading}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} 
        renderItem={({ item }) => (
          <View style={[categorystyles.categoryBox, { backgroundColor: item.color }]}>
            <TouchableOpacity>
              <Text style={[categorystyles.categoryText,(item.name === "Inbox" || item.name ==="Family") && {color: "black"}]}>{item.name}</Text>
              <Text style={[categorystyles.countText,(item.name ==="Inbox" || item.name === "Family") && {color: "black"}]}>{getCount(item.name)} {getCount(item.name) <= 1 ? "task" : "tasks"}</Text>              
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};



export default CategoryList;
