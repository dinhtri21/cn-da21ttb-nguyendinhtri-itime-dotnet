export type Material = {
    materialId: number,
    materialName: string,
};

export type MaterialResponse = {
    materials: Material[],
    total: number,
    limit: number,
    skip: number,
};