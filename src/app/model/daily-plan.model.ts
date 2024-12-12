import { Meal } from "./meal.model";

export class DailyPlan{
    constructor(
        public id: string,
        public date: Date,
        public dayOfWeek: string,
        public meals: Meal[],
    ) { /**empty constructor */ }
}