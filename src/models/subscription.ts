export interface Subscription {
  id?: number | null;
  user_id:number;
  plant_type:string;
  all_access:string;
  price:string;
  payment_method:string;
  payment_status:string;
  started_at:string;
  expire_at:string;
}
