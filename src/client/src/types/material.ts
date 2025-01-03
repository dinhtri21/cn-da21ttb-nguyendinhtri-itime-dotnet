export type Material = {
  materialId: number;
  materialName: string;
};

export type MaterialResponse = {
  materials: Material[];
  total: number;
  limit: number;
  skip: number;
};

export type CreateMaterial = {
  materialName: string;
};

export type UpdateMaterialRequest = {
  materialId: number;
  materialName: string;
};
