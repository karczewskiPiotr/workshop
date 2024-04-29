import { generateId } from "lucia";
import { db } from ".";
import {
  Car,
  Client,
  Employee,
  Garage,
  User,
  cars,
  clients,
  employees,
  garages,
  insertCarSchema,
  insertClientSchema,
  insertEmployeeSchema,
  insertGarageSchema,
  insertRepairSchema,
  insertUserSchema,
  repairs,
  users,
} from "./schema";
import { Argon2id } from "oslo/password";
import { faker } from "@faker-js/faker";
import { z } from "zod";

(async function () {
  await db.transaction(async (tx) => {
    const dbUsers = await tx
      .insert(users)
      .values(await mockUsers())
      .returning();

    const dbGarages = await tx
      .insert(garages)
      .values(mockGarages(dbUsers.slice(0, 2)))
      .returning();

    const dbEmployees = await tx
      .insert(employees)
      .values(mockEmployess(dbGarages, dbUsers))
      .returning();

    const dbClients = await tx
      .insert(clients)
      .values(mockClients(dbGarages))
      .returning();

    const dbCars = await tx
      .insert(cars)
      .values(mockCars(dbClients))
      .returning();

    await tx
      .insert(repairs)
      .values(mockRepairs(dbGarages, dbCars, dbClients, dbEmployees));
  });
})().then(() => console.log("Seeded database"));

async function mockUsers() {
  const mockUsers: z.infer<typeof insertUserSchema>[] = [];

  for (let i = 0; i < Array(10).length; i++) {
    mockUsers.push({
      id: generateId(15),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      emailVerified: true,
      password: await new Argon2id().hash("test"),
    });
  }

  return mockUsers;
}

function mockGarages(users: User[]): z.infer<typeof insertGarageSchema>[] {
  return users.map((user) => ({ name: faker.company.name(), owner: user.id }));
}

function mockEmployess(
  garages: Garage[],
  users: User[]
): z.infer<typeof insertEmployeeSchema>[] {
  return users.slice(2).map((user) => ({
    userId: user.id,
    garageId: faker.helpers.arrayElement(garages).id,
    status: faker.helpers.arrayElement(["active", "pending"]),
    createdAt: faker.date.recent({ days: 15 }),
  }));
}

function mockClients(garages: Garage[]): z.infer<typeof insertClientSchema>[] {
  return Array(20)
    .fill(null)
    .map(() => ({
      garageId: faker.helpers.arrayElement(garages).id,
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    }));
}

type InsertCar = z.infer<typeof insertCarSchema>;
function mockCars(clients: Client[]): InsertCar[] {
  return clients.flatMap(
    (client) =>
      faker.helpers.multiple(
        () =>
          ({
            clientId: client.id,
            licensePlate: faker.vehicle.vrm(),
            vinNumber: faker.vehicle.vin(),
            make: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            fleet: faker.helpers.arrayElement([true, false]),
          } satisfies InsertCar),
        { count: faker.helpers.rangeToNumber({ min: 1, max: 3 }) }
      ) as InsertCar[]
  );
}

function mockRepairs(
  garages: Garage[],
  cars: Car[],
  clients: Client[],
  employees: Employee[]
): z.infer<typeof insertRepairSchema>[] {
  const clientGarageMap = new Map(
    clients.map((client) => [client.id, client.garageId])
  );
  const groupedByGarage = garages.map((garage) => ({
    garageId: garage.id,
    carIds: cars
      .filter((car) => clientGarageMap.get(car.clientId) === garage.id)
      .map((car) => car.id),
    userIds: employees
      .filter((employee) => employee.garageId === garage.id)
      .map((employee) => employee.userId),
  }));

  return groupedByGarage.flatMap(({ garageId, carIds, userIds }) => {
    return carIds.flatMap((carId) => {
      return Array(faker.helpers.rangeToNumber({ min: 2, max: 5 }))
        .fill(null)
        .map(
          () =>
            ({
              carId,
              garageId,
              userId: faker.helpers.arrayElement(userIds),
              servicedAt: faker.date.past({ years: 2 }),
              description: faker.lorem.paragraphs({ min: 1, max: 5 }),
            } satisfies z.infer<typeof insertRepairSchema>)
        );
    });
  });
}
