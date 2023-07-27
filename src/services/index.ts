import { faker } from "@faker-js/faker";

export function createFakeData(length: number) {
  return Array.from({ length }, () => ({
    placa: faker.vehicle.vrm(),
    tipo: faker.vehicle.model(),
    status: ["Desligado", "Ligado", "Parado"][
      Number(
        faker.random.numeric(1, {
          bannedDigits: ["3", "4", "5", "6", "7", "8", "9"],
        })
      )
    ],
  }));
}
