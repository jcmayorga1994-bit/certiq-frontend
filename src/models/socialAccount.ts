export interface SocialAccount {
  id?: number | null;
  user_id:number;
  provider:string;
  provider_id:string;
  access_token:string;
}
