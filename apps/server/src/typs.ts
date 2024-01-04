export interface Cow {
  cow_id: string;
  enter_date: Date;
  enter_time: string;
  cow_num: number;
  status: string;
}

export interface NewCowInstance {
  cow_id: string;
  enter_date: string;
  enter_time: string;
  cow_num: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface CowAttributes {
  cow_id: string;
  enter_date: Date;
  enter_time: string;
  cow_num: number;
  status: string;
}


