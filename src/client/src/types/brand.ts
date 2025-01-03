export type Brand = { 
    brandId: number,
    brandName: string,
    brandDescription: string,
    brandImageUrl: string,
}

export type BrandResponse = {
    brands: Brand[],
    total: number,
    skip: number,
    limit: number,
}

export type UpdateBrandRequest = {
    BrandId: number,
    BrandName: string,
    BrandDescription: string,
    BrandImage: File,
}