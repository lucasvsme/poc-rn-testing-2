import * as Console from "console";
import * as Crypto from "crypto";
import * as HTTP from "http";
import * as URL from "url";
import Process from "process";

type Customer = { name: string; age: number };

type ExistingCustomer = Customer & { id: string };

let customers: ExistingCustomer[] = [];

const create: HTTP.RequestListener = (request, response) => {
  const bodyInChunks: Uint8Array[] = [];

  request.on("data", (chunk: Uint8Array) => {
    bodyInChunks.push(chunk);
  });

  request.on("end", () => {
    const body = Buffer.concat(bodyInChunks).toString();

    const customer: Customer = JSON.parse(body);
    const existingCustomer: ExistingCustomer = {
      ...customer,
      id: Crypto.randomBytes(16).toString("hex"),
    };

    customers.push(existingCustomer);

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(existingCustomer));
    response.end(() => {
      Console.debug("Customer created: %s", existingCustomer);
    });
  });
};

const findAll: HTTP.RequestListener = (_request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.write(JSON.stringify({ customers }));
  response.end(() => {
    Console.debug("Customers found: %s", JSON.stringify({ customers }));
  });
};

const remove: HTTP.RequestListener = (request, response) => {
  const url = URL.parse(request.url!);
  const slashes = url.path?.split("/")!;
  const id = slashes[slashes.length - 1];

  customers = customers.filter((customer) => {
    return customer.id !== id;
  });

  response.statusCode = 204;
  response.setHeader("Content-Type", "application/json");
  response.end(() => {
    Console.debug("Customer removed: %s", id);
  });
};

const server = HTTP.createServer((request, response) => {
  const url = URL.parse(request.url!);

  if (url.path?.includes("/customer")) {
    if (request.method === "POST") {
      return create(request, response);
    }

    if (request.method === "GET") {
      return findAll(request, response);
    }

    if (request.method === "DELETE") {
      return remove(request, response);
    }
  }

  return response.end();
});

const port = Process.env.PORT;

server.listen(port, () => {
  Console.debug("Server running on port %d", port);
});
