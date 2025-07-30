
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { TodoItem } from '../../types/todo';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  visible: boolean;
  onClose: () => void;
  category: { id: string; name: string; color: string };
  todos: TodoItem[];
};

const CategoryModal = ({ visible, onClose, category, todos }: Props) => {
  const filteredTodos = todos.filter((todo) => todo.category === category.name);

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
              <View style={styles.checkboxCircle} />
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
  checkboxCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
    marginRight: 10,
    marginTop: 4,
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
  },
 
});

export default CategoryModal;
