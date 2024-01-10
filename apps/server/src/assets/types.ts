// type User = { id: string; name: string; };

// type userList: () => User[];
// userById: (id: string) => User;
// userCreate: (data: { name: string }) => User;

export interface CowAttributesCreate {
    cow_id: string;
    enter_date: Date;
    enter_time: string;
    cow_num: number;
    status: string;
    stage: number;
    rea_img: string;
  }
  
  export interface CowAttributesRead extends CowAttributesCreate {
    updatedAt: Date;
    createdAt: Date;
  }
  export interface DaySumAttributesCreate {
    date: string;
    k_sum: number;
    kPlus_sum: number;
    t1: number;
    t2: number;
    t3: number;
  }
  export interface DaySumAttributesRead extends DaySumAttributesCreate {
    updatedAt: Date;
    createdAt: Date;
  }
  