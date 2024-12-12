import { DailyPlan } from "./daily-plan.model";

export class WeeklyPlan {
    constructor(
        public id: string,
        public startDate: Date,
        public endDate: Date,
        public dailyPlans: DailyPlan[]
    ){ /**empty constructor */ }
}