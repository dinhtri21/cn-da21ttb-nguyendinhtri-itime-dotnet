export type StatisticOrderRevenuesRes = {
    totalRevenue: number;
    totalCount: number;
    dailyData?: {
        date: string;
        revenue: number;
        count: number;
    }[];
    monthlyData?: {
        month: string;
        revenue: number;
        count: number;
    }[];
}

