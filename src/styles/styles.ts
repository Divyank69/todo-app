import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#e0f7fa',
    marginVertical: 8,
    borderRadius: 13,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 25,
    marginBottom: 12,
    color: '#333',
  },
  itemseparator: {

    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },

  headerrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  headingLine: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    marginTop: 5,
    marginBottom: 25,
  },
  checkboxstyle: {
    backgroundColor: 'transparent',
    padding: 5,
    margin: 2,
    borderWidth: 0,
    marginRight: 8,
    marginLeft: -5

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '85%',

  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  canceldonerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20
  },
  textArea: {

    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    height: 100
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  alarmIcon: {
    fontSize: 16,
    marginRight: 4,
    color: '#888',
  },

  timeText: {
    fontSize: 15,
    color: '#666',
  },
  deadlinebutton: {
    backgroundColor: '#576ff7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  textdeadline: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  delete: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 13,
    marginVertical: 8,
  },
  edit: {
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 13,
    marginVertical: 8
  }


});

export default styles;