export type DiscountType = "percentage" | "fixed";

export type StockStatus = "In Stock" | "Out of Stock" | "Pre Order";

export interface ProductSpecification {
    key: string;
    value: string;
}

export interface ProductDimensions {
    length: number;
    width: number;
    height: number;
}

export interface ProductFormData {
    averageRating: any;
    numReviews: number;
    ratings: any;
    _id?: string;

    // Basic Details
    name: string;
    slug: string;
    description: string;
    brand: string;
    skuID: string;

    // Pricing
    price: number;
    mrp: number;
    discountType: DiscountType;
    discountValue: number;

    // Images
    thumbnail: string;
    images: string[];

    // Category
    category: string[];
    tags: string[];

    // Inventory
    quantity: number;
    stockStatus: StockStatus;
    lowStockThreshold: number;
    soldCount: number;

    // Specifications
    specifications: ProductSpecification[];

    // Shipping
    weight: number;
    dimensions: ProductDimensions;

    // Warranty & Return
    warranty: string;
    returnDays: number;

    // Visibility
    isFeatured: boolean;
    isActive: boolean;
    isDeleted: boolean;
}