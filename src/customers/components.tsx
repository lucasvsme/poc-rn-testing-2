import React from 'react';
import Native from 'react-native';

import { AppContext } from '../context';

import { CustomerContext } from './context';
import {
  useListFeature,
  useCreateFeature,
  useCustomerValidation,
  useRemoveFeature,
} from './hooks';
import { CustomersListStyle, CustomerCreateStyle } from './styles';
import { ExistingCustomer } from './types';

export const CustomersList: React.FC = () => {
  const app = React.useContext(AppContext);
  const context = React.useContext(CustomerContext);

  const list = useListFeature(app.customerApi);
  const remove = useRemoveFeature(app.customerApi);

  React.useEffect(() => {
    list.fetch();
  }, []);

  React.useEffect(() => {
    if (context.latestCustomer !== undefined) {
      list.fetch();
    }
  }, [context.latestCustomer]);

  React.useEffect(() => {
    context.setExistingCustomers(list.customers);
  }, [list.customers]);

  React.useEffect(() => {
    if (remove.customerId !== undefined) {
      return;
    }

    if (remove.isRemoving === true) {
      return;
    }

    list.fetch();
  }, [remove.customerId, remove.isRemoving]);

  return (
    <React.Fragment>
      <Native.View style={CustomersListStyle.wrapper}>
        <Native.FlatList
          testID={'customers-list-list'}
          style={CustomersListStyle.list}
          data={list.customers}
          keyExtractor={(customer) => {
            return customer.id;
          }}
          renderItem={(list) => {
            return (
              <React.Fragment>
                <Native.View testID={'customers-list-list-item'}>
                  <Native.TouchableWithoutFeedback
                    testID={'customers-list-list-item-wrapper'}
                    onPress={() => {
                      remove.remove(list.item.id);
                    }}>
                    <Native.View style={CustomersListStyle.item}>
                      <Native.Text style={CustomersListStyle.textName}>
                        {list.item.name}
                      </Native.Text>
                      <Native.Text style={CustomersListStyle.textAge}>
                        {`${list.item.age} years old`}
                      </Native.Text>
                    </Native.View>
                  </Native.TouchableWithoutFeedback>
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
  const app = React.useContext(AppContext);
  const context = React.useContext(CustomerContext);

  const create = useCreateFeature(app.customerApi);

  const customerAgeRef = React.useRef<Native.TextInput>(null);

  const [customerName, setCustomerName] = React.useState<string>();
  const [customerAge, setCustomerAge] = React.useState<number>();

  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(false);

  const customer = useCustomerValidation({
    name: customerName,
    age: customerAge,
  });

  React.useEffect(() => {
    if (create.isCreating === true) {
      setButtonDisabled(true);
      return;
    }

    if (customer.isValid === false) {
      setButtonDisabled(true);
      return;
    }

    setButtonDisabled(false);
  }, [create.isCreating, customer.isValid]);

  React.useEffect(() => {
    if (create.customerCreated === undefined) {
      return;
    }

    setCustomerName(undefined);
    setCustomerAge(undefined);

    context.setLatestCustomer(create.customerCreated);
  }, [create.customerCreated]);

  return (
    <React.Fragment>
      <Native.View style={CustomerCreateStyle.wrapper}>
        <Native.TextInput
          testID={'customer-create-input-name'}
          style={CustomerCreateStyle.input}
          keyboardType={'default'}
          placeholder={'Customer name'}
          value={customerName}
          onChangeText={(currentText) => {
            setCustomerName(currentText);
          }}
          onSubmitEditing={() => {
            customerAgeRef.current?.focus();
          }}
        />
        <Native.TextInput
          testID={'customer-create-input-age'}
          style={CustomerCreateStyle.input}
          ref={customerAgeRef}
          keyboardType={'numeric'}
          placeholder={'Customer age'}
          value={customerAge?.toString()}
          onChangeText={(currentText) => {
            setCustomerAge(Number(currentText));
          }}
        />
        <Native.Button
          testID={'customer-create-button'}
          title="Create"
          disabled={isButtonDisabled}
          onPress={() => {
            // https://github.com/callstack/react-native-testing-library/issues/28
            if (customer.isValid === true) {
              create.create({
                name: customerName!,
                age: customerAge!,
              });
            }
          }}
        />
      </Native.View>
    </React.Fragment>
  );
};

export const CustomersView: React.FC = () => {
  const window = Native.useWindowDimensions();

  const [existingCustomers, setExistingCustomers] = React.useState<
    ExistingCustomer[]
  >([]);
  const [latestCustomer, setLatestCustomer] = React.useState<
    ExistingCustomer
  >();

  return (
    <React.Fragment>
      <CustomerContext.Provider
        value={{
          existingCustomers,
          setExistingCustomers,

          latestCustomer,
          setLatestCustomer,
        }}>
        <Native.View
          style={{
            width: window.width,
            height: window.height,
          }}>
          <CustomerCreate />
          <CustomersList />
        </Native.View>
      </CustomerContext.Provider>
    </React.Fragment>
  );
};
