// components/CategoryList.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import categorystyles from '../../styles/CategoriesList';
import { TodoItem } from '../../types/todo';
import { useState } from 'react';
import CategoryModal from './CategoriesModal';

type categoryListprops = {
    todos: TodoItem[];
    searchText: string;
}

const categories = [
    { id: '1', name: 'Inbox', color: '#EBEFF5' },
    { id: '2', name: 'Work', color: '#61DEA4' },
    { id: '3', name: 'Shopping', color: '#F45E6D' },
    { id: '4', name: 'Family', color: '#FFE761' },
    { id: '5', name: 'Personal', color: '#B678FF' },
];



const CategoryList = ({ todos, searchText }: categoryListprops) => {

    const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string; color: string } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const getCount = (categoryName: string) => {
        return todos.filter(todo => todo.category === categoryName).length;
    }

    const openModal = (item: { id: string; name: string; color: string }) => {
        setSelectedCategory(item);
        setModalVisible(true);
    }

    return (<>
        <View style={categorystyles.container}>
            <Text style={categorystyles.heading}>Categories</Text>

            <FlatList
                data={filteredCategories}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={[categorystyles.categoryBox, { backgroundColor: item.color }]}>
                        <TouchableOpacity onPress={() => openModal(item)}>
                            <Text style={[categorystyles.categoryText, (item.name === "Inbox" || item.name === "Family") && { color: "black" }]}>{item.name}</Text>
                            <Text style={[categorystyles.countText, (item.name === "Inbox" || item.name === "Family") && { color: "black" }]}>{getCount(item.name)} {getCount(item.name) <= 1 ? "task" : "tasks"}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
        {selectedCategory && (
            <CategoryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                category={selectedCategory}
                todos={todos}
            />
        )}

    </>
    );
};



export default CategoryList;
