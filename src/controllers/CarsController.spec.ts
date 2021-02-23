import { v4 } from 'uuid';

interface CarProps {
  marca: string;
  model: string;
  versao: number;
  ano: number;
  quilometragem: number;
  cambio: string;
  preco: number;

}

let cars: CarProps[] = [];

describe("CarsController", () => {
  function addNewCarToList(car: CarProps) {
    cars.push(car);
  }

  function removeCarFromList() {
    cars.pop();
  }

  it("should be able to create a new car", async () => {
    const newCar = {
      id: v4(), 
      marca: "Fiat",
      model: "Sedan",
      versao: 2015,
      ano: 2016,
      quilometragem: 153.95,
      cambio: "manual",
      preco: 58700,
    };

    addNewCarToList(newCar);

    expect(cars.length).toBeGreaterThan(0);
  });
  
  it("should be able to delete a car", async () => {
    const newCar = {
      id: v4(), 
      marca: "GM",
      model: "Hatch",
      versao: 2020,
      ano: 2021,
      quilometragem: 13.95,
      cambio: "automático",
      preco: 78900,
    };

    // para remover um carro, é necessário adicionar um novo carro
    addNewCarToList(newCar);

    const numberOfCars = cars.length;

    if (cars.length > 0) {
      removeCarFromList();
    }

    expect(cars.length).toBeLessThan(numberOfCars);
  });

  it("should be able to have an 'id' property", async () => {
    const newCar = {
      id: v4(), 
      marca: "GM",
      model: "Hatch",
      versao: 2020,
      ano: 2021,
      quilometragem: 13.95,
      cambio: "automático",
      preco: 78900,
    };

    addNewCarToList(newCar);

    expect(cars[0]).toHaveProperty('id');
  });
});