export interface UserCertification {
  id?: number | null;
  user_id:number;
  certification_id:number;
  subscription_type:string;
  start_date:string;
  end_date:string;
  status:string;
  canceled:string;
  progress:string;
  completed:string;
}
