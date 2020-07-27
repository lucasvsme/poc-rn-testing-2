# POC: React Native Testing 2

It demonstrates how to write unit tests and UI tests to a React Native application.

The user should be able to fill a form and click a button to create a customer. Clicking in an item of the customers list removes the user.

We want to write unit tests to UI code that interacts with a backend, validates user input and updates the UI conditionally. We also want to simulate user behavior in an actual Android device using an emulator.

Components are tested using [react-native-testing-library](https://github.com/callstack/react-native-testing-library), Hooks are tested using [Testing Library](https://github.com/testing-library/react-hooks-testing-library) and API calls are tested using [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter). The emulator is provisioned using [Android Virtual Devices](https://developer.android.com/studio/run/emulator-commandline) (AVD) and the tests are based on [Detox](https://github.com/wix/Detox) and [Jest](https://github.com/facebook/jest).

## How to run

| Description | Command |
| :--- | :--- |
| Install dependencies | `npm install` |
| Run unit tests | `npm test` |
| Run UI tests | `make e2e-run` |
| Create the emulator | `make create`  |
| Delete the emulator | `make delete`  |
| Start the emulator | `make device`  |
| Start the backend | `make backend-run` |

> Note: The backend should be running before the UI tests. The emulator also must be created to run the UI tests.

## Preview

![E2E test running](./preview/01.gif)

### Unit tests report

```
 PASS  src/customers/api.spec.ts (5.008 s)
  findAll
    ✓ Throwing error when call did not succeed (7 ms)
    ✓ Returning array of existing customers (1 ms)
  create
    ✓ Throwing error when call did not succeed (1 ms)
    ✓ Returning an existing customers (1 ms)
  remove
    ✓ Throwing error when call did not succeed (1 ms)
    ✓ Returning an existing customers (1 ms)

 PASS  src/customers/hooks.spec.tsx (5.564 s)
  useListFeature
    ✓ Retrieving all existing customers (24 ms)
    ✓ Setting error object when the HTTP request failed (4 ms)
  useCreateFeature
    ✓ Creating a new customer (4 ms)
    ✓ Setting error object when the HTTP request failed (3 ms)
  useCustomerValidation
    ✓ Name is required (1 ms)
    ✓ Age is required (2 ms)
    ✓ Age must be an integer (1 ms)
    ✓ Both name and age are valid (1 ms)
  useRemoveFeature
    ✓ Removing customer by its ID (3 ms)
    ✓ Setting error object when the HTTP request failed (4 ms)

 PASS  src/customers/components.spec.tsx (13.313 s)
  CustomersList
    ✓ Rendering list on first render (4746 ms)
    ✓ Calling Customer service on list item press (23 ms)
  CustomerCreate
    ✓ Customer name is required (1322 ms)
    ✓ Customer age is required (33 ms)
    ✓ Customer age must be a number (26 ms)
    ✓ Creating a customer and clearing fields (57 ms)
  CustomersView
    ✓ Updating list after customer creation (93 ms)

-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   99.26 |      100 |   97.78 |   99.26 |                   
 src             |     100 |      100 |     100 |     100 |                   
  context.ts     |     100 |      100 |     100 |     100 |                   
 src/customers   |   99.26 |      100 |   97.78 |   99.26 |                   
  api.ts         |     100 |      100 |     100 |     100 |                   
  components.tsx |   98.21 |      100 |   93.75 |   98.21 | 147               
  context.ts     |     100 |      100 |     100 |     100 |                   
  fixtures.ts    |     100 |      100 |     100 |     100 |                   
  hooks.tsx      |     100 |      100 |     100 |     100 |                   
  styles.ts      |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
Test Suites: 3 passed, 3 total
Tests:       23 passed, 23 total
Snapshots:   0 total
Time:        13.748 s
```

### UI tests report

```
PASS  e2e/index.e2e.ts (16.263 s)
  Creating and removing customers
    ✓ Creating a customer ({ name: 'John Smith', age: 45 }) (2902 ms)
    ✓ Creating a customer ({ name: 'Mary Jane', age: 67 }) (2669 ms)
    ✓ Creating a customer ({ name: 'Mike Moore', age: 18 }) (2658 ms)
    ✓ Removing a customer ({ name: 'Mike Moore', age: 18 }) (741 ms)
    ✓ Removing a customer ({ name: 'Mary Jane', age: 67 }) (737 ms)
    ✓ Removing a customer ({ name: 'John Smith', age: 45 }) (736 ms)
```
