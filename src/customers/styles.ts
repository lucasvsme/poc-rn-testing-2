import Native from 'react-native';

export const CustomerCreateStyle = Native.StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  input: {
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
  wrapper: {
    paddingHorizontal: 16,
  },
  list: {
    paddingVertical: 8,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textAge: {
    fontStyle: 'italic',
    fontSize: 14,
  },
});
