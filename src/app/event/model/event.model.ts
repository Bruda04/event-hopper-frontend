export interface Event{
    id?:number,
    name:string,
    maxAttendence:number,
    description:string,
    privacy:boolean,
    time:Date,              //da li datetime i kako?
    location:string,         //tip location
    picture:string
}