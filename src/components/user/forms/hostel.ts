import { z } from "zod";

export const schema = z.object({
    name: z.string(),
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

export interface CheckBoxes {
    food: boolean;
    washroom: boolean;
    cctv: boolean;
    parking: boolean;
    wifi: boolean;
    laundry: boolean;
    geyser: boolean;
    fan: boolean;
    studyTable: boolean;
    locker: boolean;
    cupboard: boolean;
    doctorOnCall: boolean;
    matress: boolean;
    prePayment: boolean;
    postPayment: boolean;
}

export const checkboxes = [
    "food",
    "washroom",
    "cctv",
    "parking",
    "wifi",
    "laundry",
    "geyser",
    "fan",
    "studyTable",
    "locker",
    "cupboard",
    "doctorOnCall",
    "matress",
    "prePayment",
    "postPayment"
]

export const inputFields = [
    "name",
    "lat",
    "lon",
    "city",
    "address",
    "price",
]

export type fields = "lat" | "lon" | "city" | 'address' | 'price';

export const defaultValue = {
    cctv: false,
    parking: false,
    cupboard: false,
    doctorOnCall: false,
    laundry: false,
    fan: false,
    food: false,
    geyser: false,
    locker: false,
    matress: false,
    postPayment: false,
    prePayment: false,
    studyTable: false,
    wifi: false,
    washroom: false
}

