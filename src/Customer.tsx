import React from 'react';
import {
  FlatList,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';

// DOMAIN

type Customer = { name: string; age: number };

type ExistingCustomer = Customer & { id: string };

// DATA

type Customers = { customers: ExistingCustomer[] };

interface CustomerApiClient {
  create(customer: Customer): Promise<ExistingCustomer>;
  findAll(): Promise<ExistingCustomer[]>;
}

class CustomerApiClientImpl implements CustomerApiClient {
  public constructor(private httpClient: AxiosInstance) {}

  public async create(customer: Customer): Promise<ExistingCustomer> {
    return this.httpClient
      .post<Customer, AxiosResponse<ExistingCustomer>>('/customer', customer)
      .then((response) => response.data);
  }

  public async findAll(): Promise<ExistingCustomer[]> {
    return this.httpClient
      .get<Customers>('/customer')
      .then((response) => response.data.customers);
  }
}

// BEHAVIOR

function useCustomersList(customerApiClient: CustomerApiClient) {
  const [customers, setCustomers] = React.useState<ExistingCustomer[]>([]);
  const [isFetching, setFetching] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isFetching === false) {
      return;
    }

    customerApiClient.findAll().then((allCustomers) => {
      setCustomers(allCustomers);
      setFetching(false);
      console.debug('Customers list updated');
    });
  }, [isFetching, setFetching, setCustomers]);

  const fetch = () => {
    setFetching(true);
  };

  return { customers, fetch, isFetching };
}

function useCreateCustomer(customerApiClient: CustomerApiClient) {
  const [customer, setCustomer] = React.useState<Customer>();
  const [isCreating, setCreating] = React.useState<boolean>(false);
  const [existingCustomer, setExistingCustomer] = React.useState<
    ExistingCustomer
  >();

  React.useEffect(() => {
    if (customer === undefined) {
      return;
    }

    setCreating(true);
    customerApiClient.create(customer).then((existingCustomer) => {
      setCreating(false);
      setCustomer(undefined);
      setExistingCustomer(existingCustomer);
      console.debug('Customer created');
    });
  }, [customer, setCustomer]);

  const create = (customerToCreate: Customer) => {
    setCustomer(customerToCreate);
  };

  return { existingCustomer, create, isCreating };
}

// VIEW
const CustomersContext = React.createContext({
  client: new CustomerApiClientImpl(
    Axios.create({
      baseURL: 'http://localhost:8080',
    }),
  ),
});

export const CustomersView: React.FC = () => {
  const context = React.useContext(CustomersContext);
  const list = useCustomersList(context.client);
  const create = useCreateCustomer(context.client);

  const [customerName, setCustomerName] = React.useState<string>();
  const [customerAge, setCustomerAge] = React.useState<string>();
  const [isButtonDisabled] = React.useState<boolean>(false);

  const style = StyleSheet.create({
    wrapper: {},
    createWrapper: {},
    createTextInput: {},
    listWrapper: {},
    listFlatList: {},
  });

  return (
    <>
      <View style={style.wrapper}>
        <View style={style.createWrapper}>
          <TextInput
            style={style.createTextInput}
            placeholder={'Customer name'}
            value={customerName}
            onChangeText={(currentText) => {
              setCustomerName(currentText);
            }}
          />
          <TextInput
            style={style.createTextInput}
            placeholder={'Customer age'}
            value={customerAge}
            onChangeText={(currentText) => {
              setCustomerAge(currentText);
            }}
          />
          <Button
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
        </View>
        <View style={style.listWrapper}>
          <Button
            title={'Fetch'}
            onPress={() => {
              list.fetch();
            }}
          />
          <FlatList
            style={style.listFlatList}
            data={list.customers}
            keyExtractor={(customer) => {
              return customer.id;
            }}
            renderItem={(list) => {
              return (
                <>
                  <View>
                    <Text>{list.item.name}</Text>
                    <Text>{list.item.age}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};
