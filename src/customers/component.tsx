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
          disabled={list.isFetching}
          onPress={() => {
            list.fetch();
          }}
        />
        <Native.FlatList
          testID={'customers-list-list'}
          style={CustomersStyle.listFlatList}
          data={list.customers}
          keyExtractor={(customer) => {
            return customer.id;
          }}
          renderItem={(list) => {
            return (
              <React.Fragment>
                <Native.View
                  testID={'customers-list-list-item'}
                  style={CustomersStyle.listItemWrapper}>
                  <Native.Text style={CustomersStyle.listItemTextName}>
                    {list.item.name}
                  </Native.Text>
                  <Native.Text style={CustomersStyle.listItemTextAge}>
                    {`${list.item.age} years old`}
                  </Native.Text>
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

  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (create.isCreating === true) {
      setButtonDisabled(true);
      return;
    }

    if (customerName === undefined) {
      setButtonDisabled(true);
      return;
    }

    if (customerAge === undefined) {
      setButtonDisabled(true);
      return;
    }

    setButtonDisabled(false);
  }, [customerName, customerAge, create.isCreating]);

  React.useEffect(() => {
    if (create.customerCreated === undefined) {
      return;
    }

    setCustomerName(undefined);
    setCustomerAge(undefined);

    console.debug('Customer created', create.customerCreated.id);
  }, [create.customerCreated]);

  return (
    <React.Fragment>
      <Native.View style={CustomersStyle.createWrapper}>
        <Native.TextInput
          testID={'customer-create-input-name'}
          style={CustomersStyle.createTextInput}
          keyboardType={'default'}
          placeholder={'Customer name'}
          value={customerName}
          onChangeText={(currentText) => {
            setCustomerName(currentText);
          }}
        />
        <Native.TextInput
          testID={'customer-create-input-age'}
          style={CustomersStyle.createTextInput}
          keyboardType={'numeric'}
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
          }}
        />
      </Native.View>
    </React.Fragment>
  );
};

export const CustomersView: React.FC = () => {
  const window = Native.useWindowDimensions();

  return (
    <React.Fragment>
      <Native.View
        style={{
          width: window.width,
          height: window.height,
        }}>
        <CustomerCreate />
        <CustomersList />
      </Native.View>
    </React.Fragment>
  );
};
