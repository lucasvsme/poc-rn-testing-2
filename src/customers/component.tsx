import React from 'react';
import Native from 'react-native';
import Axios from 'axios';

import { useCustomersList, useCreateCustomer } from './hooks';
import { CustomerApiClient, CustomerApiClientImpl } from './service';
import { CustomersStyle } from './style';

type CustomersContext = {
  client: CustomerApiClient;
};

const CustomersContextImpl = React.createContext<CustomersContext>({
  client: new CustomerApiClientImpl(
    Axios.create({
      baseURL: 'http://localhost:8080',
    }),
  ),
});

export const CustomersView: React.FC = () => {
  const context = React.useContext(CustomersContextImpl);
  const list = useCustomersList(context.client);
  const create = useCreateCustomer(context.client);

  const [customerName, setCustomerName] = React.useState<string>();
  const [customerAge, setCustomerAge] = React.useState<string>();
  const [isButtonDisabled] = React.useState<boolean>(false);

  return (
    <>
      <Native.View style={CustomersStyle.wrapper}>
        <Native.View style={CustomersStyle.createWrapper}>
          <Native.TextInput
            style={CustomersStyle.createTextInput}
            placeholder={'Customer name'}
            value={customerName}
            onChangeText={(currentText) => {
              setCustomerName(currentText);
            }}
          />
          <Native.TextInput
            style={CustomersStyle.createTextInput}
            placeholder={'Customer age'}
            value={customerAge}
            onChangeText={(currentText) => {
              setCustomerAge(currentText);
            }}
          />
          <Native.Button
            title="Create"
            disabled={isButtonDisabled}
            onPress={() => {
              if (customerName === undefined) {
                console.debug('Customer name is undefined');
                return;
              }

              if (customerAge === undefined) {
                console.debug('Customer age is undefined');
                return;
              }

              const customerAgeNumber = Number(customerAge);

              if (isNaN(customerAgeNumber)) {
                console.debug('Customer age is not a number');
                return;
              }

              create.create({
                name: customerName,
                age: customerAgeNumber,
              });

              setCustomerName(undefined);
              setCustomerAge(undefined);
            }}
          />
        </Native.View>
        <Native.View style={CustomersStyle.listWrapper}>
          <Native.Button
            title={'Fetch'}
            onPress={() => {
              list.fetch();
            }}
          />
          <Native.FlatList
            style={CustomersStyle.listFlatList}
            data={list.customers}
            keyExtractor={(customer) => {
              return customer.id;
            }}
            renderItem={(list) => {
              return (
                <>
                  <Native.View>
                    <Native.Text>{list.item.name}</Native.Text>
                    <Native.Text>{list.item.age}</Native.Text>
                  </Native.View>
                </>
              );
            }}
          />
        </Native.View>
      </Native.View>
    </>
  );
};
