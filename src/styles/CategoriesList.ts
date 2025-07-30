import { StyleSheet } from "react-native";

const categorystyles = StyleSheet.create({
  container: {
    //paddingHorizontal:20,
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 100
  },
  heading: {
    marginTop:20,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#555',
    paddingHorizontal:15
  },
  categoryBox: {
    padding: 18,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical:20,
    paddingHorizontal:20
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default categorystyles;