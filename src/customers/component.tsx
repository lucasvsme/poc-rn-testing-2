import React from 'react';
import Native from 'react-native';

import { CustomerContext } from './context';
import { useListFeature, useCreateFeature } from './hooks';
import { CustomersStyle } from './style';

export const CustomersList: React.FC = () => {
  const context = React.useContext(CustomerContext);
  const list = useListFeature(context.client);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export const CustomerCreate: React.FC = () => {
  const context = React.useContext(CustomerContext);
  const create = useCreateFeature(context.client);

  const [customerName, setCustomerName] = React.useState<string>();
  const [customerAge, setCustomerAge] = React.useState<string>();

  const [isButtonDisabled] = React.useState<boolean>(false);

  return (
    <React.Fragment>
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
          onPress={(): void => {
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
    </React.Fragment>
  );
};

export const CustomersView: React.FC = () => {
  return (
    <React.Fragment>
      <Native.View style={CustomersStyle.wrapper}>
        <CustomerCreate />
        <CustomersList />
      </Native.View>
    </React.Fragment>
  );
};
