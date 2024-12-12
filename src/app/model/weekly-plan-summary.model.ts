import { Fact } from "./fact.model";

export class WeeklyPlanSummary {
    constructor(
        public id: string,
        public date: Date,
        public dayOfWeek: string,
        public nutritionalInfo: Fact[],
    ) { /**empty constructor */ }
}
