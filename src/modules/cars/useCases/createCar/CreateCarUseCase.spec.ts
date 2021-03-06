import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car name",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an existent license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "Car description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Car brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "Car description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Car brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car with available set to true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Availability Test",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-0000",
            fine_amount: 60,
            brand: "Car brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
