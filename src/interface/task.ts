export interface Task {
    key?: string;
    Name: string;
    observation: string;
    Status:boolean;
    CreationDate: Date;
    DateCulminated: Date;
    provider:string;
    boat:string;
}