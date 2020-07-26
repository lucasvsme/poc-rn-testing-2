import { device, element, by, expect } from 'detox';

async function delay(timeInMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeInMs);
  });
}

beforeAll(async () => {
  //@ts-ignore
  await device.reverseTcpPort(process.env.API_PORT);
  await device.reloadReactNative();
});

// https://github.com/wix/detox/issues/209
const customers: [string, string][] = [
  ['John Smith', '45\n'],
  ['Mary Jane', '67\n'],
  ['Mike Moore', '18\n'],
  ['Ave Yorke', '32\n'],
];

test('Creating customers, listing and deleting them', async () => {
  for (const [name, age] of customers) {
    await element(by.id('customer-create-input-name')).typeText(name);
    await element(by.id('customer-create-input-age')).typeText(age);
    await element(by.id('customer-create-button')).tap();

    await expect(element(by.text(name))).toExist();

    await delay(500);
  }

  for (const [name] of customers.reverse()) {
    await element(by.text(name)).tap();

    await delay(1000);
  }
});
