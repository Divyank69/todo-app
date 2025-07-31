
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { TodoItem } from '../../types/todo';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements';

type Props = {
  visible: boolean;
  onClose: () => void;
  category: { id: string; name: string; color: string };
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;

};

const CategoryModal = ({ visible, onClose, category, todos,setTodos }: Props) => {
  const filteredTodos = todos.filter((todo) => todo.category === category.name);

  const togglecheckBox = (id: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, status: !todo.status } : todo
        );
        setTodos(updatedTodos);
    }

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: category.color }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.taskCount}>{filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}</Text>
         
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="x" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <CheckBox
                        checked={item.status}
                        onPress={() => togglecheckBox(item.id)}
                        containerStyle={styles.checkboxstyle}
                        checkedColor="black"
                        uncheckedColor="#ccc"
                        size={35}
                    />
              <View>
                <Text style={styles.todoText}>{item.title}</Text>
                {item.deadline && (
                  <Text style={styles.deadlineText}>📅 {item.deadline}</Text>
                )}
                <View style={styles.divider}></View>

              </View>

            </View>
          )}
        />

        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  taskCount: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  
  todoText: {
    fontSize: 16,
    color: '#fff',
  },
  deadlineText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },closeButton: {
    position: 'absolute',
    top: 15,
    right: 2,
    zIndex: 1,
  },
    
   divider: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 15,
  },checkboxstyle: {
    backgroundColor: 'transparent',
    padding: 5,
    margin: 2,
    borderWidth: 0,
    marginRight: 5,
    marginLeft: -5

  },
 
});

export default CategoryModal;
