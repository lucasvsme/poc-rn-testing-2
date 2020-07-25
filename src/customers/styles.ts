import Native from 'react-native';

export const CustomerCreateStyle = Native.StyleSheet.create({
  createWrapper: {
    padding: 16,
  },
  createTextInput: {
    borderStyle: 'solid',
    marginVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'lightgray',
    borderRadius: 8,
    borderWidth: 1,
    color: 'black',
  },
});

export const CustomersListStyle = Native.StyleSheet.create({
  listWrapper: {
    paddingHorizontal: 16,
  },
  listFlatList: {
    paddingVertical: 8,
  },
  listItemWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  listItemTextName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItemTextAge: {
    fontStyle: 'italic',
    fontSize: 14,
  },
});
