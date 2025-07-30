import React, { useEffect, useState } from "react";

import {
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { CheckBox } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Swipeable } from 'react-native-gesture-handler';
import Toast from "react-native-root-toast";
import { Picker } from '@react-native-picker/picker';


import styles from "../../styles/styles";
import { TodoItem } from "../../types/todo";
import Icon from "../../components/Icons";



const Todo = () => {

  const isDarkMode = useColorScheme() === "dark";
  const [modalVisible, setModalVisible] = useState(false);
  const [addnewTask, setAddnewTask] = useState('');

  const [deadline, setDeadline] = useState<Date | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<'Inbox' | 'Work' | 'Shopping' | 'Family' | 'Personal'>('Inbox');


  const showToast = (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      backgroundColor: '#333',
      textColor: '#fff',
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  const categoryColors: Record<TodoItem["category"], string> = {

    Inbox: "#EBEFF5",
    Work: "#61DEA4",
    Shopping: "#F45E6D",
    Family: "#FFE761",
    Personal: "#B678FF"
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'time',
      is24Hour: true,
      onChange: (_event, selectedTime) => {
        if (selectedTime) {
          setDeadline(selectedTime);
        }
      },
    });
  };

  // const [showPicker,setShowPicker]=useState(false);  
  // const todos: TodoItem[] =[
  //  {id: "1",title: "Start making a presentation",status: "false"},
  //  {id: "2",title: "Pay for rent",status: "false"},
  //  {id: "3",title: "Buy a milk", status: "false"},
  //  {id: "4",title: "Dont forget to pickup michael from school",status: "false"},
  //  {id: "5",title: "Buy a chocolate for Shivam",status: "false"}
  // ] ;

  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: "Start making a presentation 🖥️", status: false, category: "Work" },
    { id: 2, title: "Pay for rent 💵", status: false, category: "Personal" },
    { id: 3, title: "Buy milk 🥛", status: false, deadline: "8:00 a.m", category: "Shopping" },
    { id: 4, title: "Dont forget to pickup michael 📍", status: false, category: "Family" },
    { id: 5, title: "Buy chocolate for Shivam 🍫", status: false, category: "Work" },
  ]);


  // get todos
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.log("Error loading todos from async storage", error);
      }
    };
    loadTodos();
  }, []);

  // set todos

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.log("Error in saving todos to async storage ", error);
      }
    }
    saveTodos();
  }, [todos]);


  const togglecheckBox = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updatedTodos);
  }

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos);
    showToast('🗑️ Task deleted successfully!');

  }

  const handleEdit = (id: number, title: string, category: TodoItem['category']) => {

    setAddnewTask(title);
    setCurrentEditId(id);
    setIsEditMode(true);
    setModalVisible(true);
    setSelectedCategory(category);
  };

  const handleAddTask = () => {
    if (addnewTask.trim() === '') return;

    //Edit task

    if (isEditMode && currentEditId !== null) {

      const updatedTodos = todos.map(todo =>
        todo.id === currentEditId ? { ...todo, title: addnewTask.trim(), category: selectedCategory } : todo
      );
      setTodos(updatedTodos);
      setIsEditMode(false);
      setCurrentEditId(null);
      setModalVisible(false);
      showToast('✏️ Task updated successfully!');


    } else {
      //Add task
      if (!deadline) {
        Alert.alert("Please select a deadline time.");
        return;
      }

      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

      const newTodo: TodoItem = {
        id: newId,
        title: addnewTask.trim(),
        status: false,
        category: selectedCategory,
        deadline: deadline ? deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : undefined,

      };

      setTodos(prev => [...prev, newTodo]);

      setAddnewTask('');

      setDeadline(null);
      setModalVisible(false);
      setSelectedCategory('Inbox');
      showToast('✅ Task added successfully!');


    }
  }

  const renderItem = ({ item }: { item: TodoItem }) => {
    const renderRightActions = () => {
      return (

        <View style={{ flexDirection: "row", gap: 5 }}>

          <TouchableOpacity onPress={() => handleEdit(item.id, item.title, item.category)} style={styles.edit}>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 15 }}>📝 Edit</Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.delete}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>🗑 Delete</Text>
          </TouchableOpacity>

        </View>

      )

    }

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.item}>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"}></StatusBar>


          <CheckBox
            checked={item.status}
            onPress={() => togglecheckBox(item.id)}
            containerStyle={styles.checkboxstyle}
            checkedColor="#576ff7"
            uncheckedColor="#ccc"
            size={35}
          />
          <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
              <Text style={styles.itemText}>{item.title}</Text>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: categoryColors[item.category],
                }}
              />

            </View>



            {item.deadline &&
              <View style={styles.timeRow}>
                <Text style={styles.alarmIcon}>⏰</Text>
                <Text style={styles.timeText}>{item.deadline}</Text>
              </View>
            }
          </View>

        </View>
      </Swipeable>
    )

  }

  const itemseparator = () => (
    <View style={styles.itemseparator}></View>
  );

  return (


    <View style={styles.container}>

      <View style={styles.headerrow}>
        <Text style={styles.heading}>Today's Task 📌</Text>       
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add-circle" size={42} color="#576ff7" style={{ marginTop: 15 }} />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{isEditMode ? "Edit Task" : "Add new Task"}</Text>

              <TextInput
                placeholder="Enter your task here..."
                multiline
                numberOfLines={10}
                style={styles.textArea}
                value={addnewTask}
                onChangeText={setAddnewTask}
              />

              {/* <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 4, fontSize: 15 }}>Choose Category:</Text>
              <View style={{ borderWidth: 2, borderRadius: 8, borderColor: '#ccc', marginTop: 5 }}> */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Choose Category:</Text>
                <View style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: categoryColors[selectedCategory],
                  marginRight: 5,
                }} />
              </View>
              <View style={{ borderWidth: 2, borderRadius: 8, borderColor: '#ccc', marginTop: 5 }}>

                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  style={{ height: 55 }}
                >
                  <Picker.Item label="Inbox" value="Inbox"/>
                  <Picker.Item label="Work" value="Work" />
                  <Picker.Item label="Shopping" value="Shopping" />
                  <Picker.Item label="Family" value="Family" />
                  <Picker.Item label="Personal" value="Personal" />
                </Picker>
              </View>


              {!isEditMode && (
                <TouchableOpacity onPress={showTimePicker} style={styles.deadlinebutton}>
                  <Text style={styles.textdeadline}>📅 Add DeadLine</Text>
                </TouchableOpacity>
              )}

              <View style={styles.canceldonerow}>
                <TouchableOpacity onPress={() => { setModalVisible(false), setAddnewTask(''), setIsEditMode(false), setCurrentEditId(null) }} >
                  <Text style={{ color: "blue", fontWeight: '400', fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAddTask}>
                  <Text style={{ color: "blue", fontWeight: '600', fontSize: 20 }}>{isEditMode ? "Update" : "Done"}</Text>
                </TouchableOpacity>

              </View>

            </View>
          </View>
        </Modal>

      </View>

      <View style={styles.headingLine}></View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={itemseparator}
      />
    </View>

  )
};

export default Todo;

