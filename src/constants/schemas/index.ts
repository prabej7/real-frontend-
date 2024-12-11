import { z } from 'zod';

export const propertySchema = z.object({
    noOfRooms: z.preprocess(
        (value) => {
            const parsed = parseInt(String(value), 10);
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().int().positive({ message: "Number of rooms must be at least 1." })
    ),
    maxPeople: z.preprocess(
        (value) => {
            const parsed = parseInt(String(value), 10);
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().int().positive({ message: "Maximum people must be at least 1." })
    ),
    paymentMode: z.string(),
    noticePeriod: z.preprocess(
        (value) => {
            if (value === undefined || value === null || value === '') return undefined;
            const parsed = parseInt(String(value), 10);
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().int().nonnegative().optional()
    ),
    securityDeposit: z.preprocess(
        (value) => {
            if (value === undefined || value === null || value === '') return undefined;
            const parsed = parseFloat(String(value));
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().nonnegative().optional()
    ),
    restrictions: z.string().min(1, { message: "Field is required." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters long." }),
    lat: z.string(),
    lon: z.string(),
    price: z.preprocess(
        (value) => {
            const parsed = parseFloat(String(value));
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().positive({ message: "Price must be a positive number." })
    ),
    city: z.string().min(2, { message: "City must be at least 2 characters long." }),
});

export type PropertySchemaType = z.infer<typeof propertySchema>;

