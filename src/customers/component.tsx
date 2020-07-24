import React from 'react';
import Native from 'react-native';

import { useListFeature, useCreateFeature } from './hooks';
import { CustomerApiClient } from './service';
import { CustomersStyle } from './style';

export type CustomersViewProps = {
  client: CustomerApiClient;
};

export const CustomersView: React.FC<CustomersViewProps> = (props) => {
  const list = useListFeature(props.client);
  const create = useCreateFeature(props.client);

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
            onChangeText={(currentText): void => {
              setCustomerName(currentText);
            }}
          />
          <Native.TextInput
            style={CustomersStyle.createTextInput}
            placeholder={'Customer age'}
            value={customerAge}
            onChangeText={(currentText): void => {
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
        <Native.View style={CustomersStyle.listWrapper}>
          <Native.Button
            title={'Fetch'}
            onPress={(): void => {
              list.fetch();
            }}
          />
          <Native.FlatList
            style={CustomersStyle.listFlatList}
            data={list.customers}
            keyExtractor={(customer): string => {
              return customer.id;
            }}
            renderItem={(list): React.ReactElement => {
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
