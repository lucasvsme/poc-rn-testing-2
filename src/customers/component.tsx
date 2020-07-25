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
          testID={'customers-list-button'}
          title={'Fetch'}
          onPress={() => {
            list.fetch();
          }}
        />
        <Native.FlatList
          testID={'customers-list-list'}
          style={CustomersStyle.listFlatList}
          initialNumToRender={0}
          data={list.customers}
          keyExtractor={(customer) => {
            return customer.id;
          }}
          renderItem={(list) => {
            return (
              <React.Fragment>
                <Native.View testID={'customers-list-list-item'}>
                  <Native.Text>{list.item.name}</Native.Text>
                  <Native.Text>{list.item.age}</Native.Text>
                </Native.View>
              </React.Fragment>
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

  React.useEffect(() => {
    if (create.customerCreated === undefined) {
      return;
    }

    console.debug('Customer created', create.customerCreated.id);
  }, [create.customerCreated]);

  return (
    <React.Fragment>
      <Native.View style={CustomersStyle.createWrapper}>
        <Native.TextInput
          testID={'customer-create-input-name'}
          style={CustomersStyle.createTextInput}
          placeholder={'Customer name'}
          value={customerName}
          onChangeText={(currentText) => {
            setCustomerName(currentText);
          }}
        />
        <Native.TextInput
          testID={'customer-create-input-age'}
          style={CustomersStyle.createTextInput}
          placeholder={'Customer age'}
          value={customerAge}
          onChangeText={(currentText) => {
            setCustomerAge(currentText);
          }}
        />
        <Native.Button
          testID={'customer-create-button'}
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
