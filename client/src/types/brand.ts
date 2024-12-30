export type Brand = { 
    brandId: number,
    brandName: string,
    brandDescription: string,
}

export type BrandResponse = {
    brands: Brand[],
    total: number,
    skip: number,
    limit: number,
}