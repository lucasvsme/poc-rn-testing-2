import { device, element, by, expect } from 'detox';

beforeAll(async () => {
  //@ts-ignore
  await device.reverseTcpPort(process.env.API_PORT);
  await device.reloadReactNative();
});

type Customer = {
  name: string;
  age: number;
};

const customers: Customer[] = [
  { name: 'John Smith', age: 45 },
  { name: 'Mary Jane', age: 67 },
  { name: 'Mike Moore', age: 18 },
];

describe('Creating and removing customers', () => {
  test.each(customers)(
    'Creating a customer (%s)',
    async (customer: Customer) => {
      // https://github.com/wix/detox/issues/209
      const age = `${customer.age}\n`;

      await element(by.id('customer-create-input-name')).typeText(
        customer.name,
      );
      await element(by.id('customer-create-input-age')).typeText(age);
      await element(by.id('customer-create-button')).tap();

      await expect(element(by.text(customer.name))).toExist();
    },
  );

  test.each(customers.reverse())(
    'Removing a customer (%s)',
    async (customer: Customer) => {
      await element(by.text(customer.name)).tap();

      await expect(element(by.text(customer.name))).toNotExist();
    },
  );
});
