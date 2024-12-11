export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    role: string | null;
    phone: string | null;
    lat: number | null;
    lon: number | null;
    fullName: string | null;
    address: string | null;
    avatar: string | null;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Info {
    id: string;
    lat: number;
    lon: number;
    address: string;
    city: string;
    imgs: string[];
    price: number;
}

export interface Room {
    id: string;
    noOfRooms: number;
    flat: boolean;
    waterfacility: boolean;
    maxPeople: number;
    payment: string;
    furnished: boolean;
    securityDeposit: number;
    noticePeriod: string;
    balcony: boolean;
    waterTank: boolean;
    wifi: boolean;
    restrictions: string;
    infosId: string;
    createdAt: string;
    updatedAt: string;
    info: Info;
    usersId: string;
}

export interface Hostel {
    id: string;
    name: string;
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
    infosId: string;
    createdAt: string;
    updatedAt: string;
    info: Info;
    usersId: string;
}

export interface Land {
    id: string;
    size: string;
    parking: boolean;
    waterTank: boolean;
    balcony: boolean;
    furnished: boolean;
    roadSize: string;
    infosId: string;
    createdAt: string;
    updatedAt: string;
    info: Info;
    usersId: string;
}

