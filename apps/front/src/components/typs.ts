export interface CowNumber {
  cow_id: string;
  enter_date: string;
  enter_time: string;
  cow_num: number;
  status: string;
  }
  
  export  type LoadingProps = {
    type: string
    color : string
  };

  interface PersonNode {
    __typename: string;
    id: string;
    lastName: string;
  }
  
  interface PeopleEdge {
    __typename: string;
    node: PersonNode;
  }
  
  interface PeopleConnection {
    __typename: string;
    edges: PeopleEdge[];
  }
  
export  interface GetPersonByFirstNameResponse {
    data: {
      getPersonByFirstName: PeopleConnection;
    };
    loading: boolean;
    networkStatus: number;
  }