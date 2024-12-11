import { z } from "zod";

export const schema = z.object({
    size: z.string(),
    roadSize: z.string(),
    address: z.string().min(5, { message: "Address must be at least 5 characters long." }),
    lat: z.preprocess(
        (value) => {
            const parsed = parseFloat(String(value));
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().min(-90, { message: "Latitude must be between -90 and 90." }).max(90, { message: "Latitude must be between -90 and 90." })
    ),
    lon: z.preprocess(
        (value) => {
            const parsed = parseFloat(String(value));
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().min(-180, { message: "Longitude must be between -180 and 180." }).max(180, { message: "Longitude must be between -180 and 180." })
    ),
    price: z.preprocess(
        (value) => {
            const parsed = parseFloat(String(value));
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().positive({ message: "Price must be a positive number." })
    ),
    city: z.string().min(2, { message: "City must be at least 2 characters long." }),
});

export type formField = z.infer<typeof schema>;

export const checkboxes = [
    "waterTank",
    "balcony",
    "furnished",
    "parking"
]

export interface CheckBoxes {
    waterTank: boolean;
    balcony: boolean;
    furnished: boolean;
    parking: boolean;
}

export const inputFields = [
    "size",
    "roadSize",
    "lat",
    "lon",
    "city",
    "address",
    "price",
]

export const defaultValue = {
    waterTank: false,
    balcony: false,
    furnished: false,
    parking: false,
}