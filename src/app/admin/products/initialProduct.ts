import { ProductFormData } from "./types";

export const initialProduct: ProductFormData = {
    name: "",
    slug: "",
    description: "",
    brand: "",
    skuID: "",

    price: 0,
    mrp: 0,
    discountType: "percentage",
    discountValue: 0,

    thumbnail: "",
    images: [""],

    category: [],
    tags: [],

    quantity: 0,
    stockStatus: "In Stock",
    lowStockThreshold: 5,
    soldCount: 0,

    specifications: [
        {
            key: "",
            value: "",
        },
    ],

    weight: 0,

    dimensions: {
        length: 0,
        width: 0,
        height: 0,
    },

    warranty: "No Warranty",
    returnDays: 7,

    isFeatured: false,
    isActive: true,
    isDeleted: false,
};