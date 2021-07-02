export class Todo 
{
    id:number ;
    act:string;

    public constructor(activity:string);
    public constructor(id:number , activity:string);

    public constructor(...myarray: any[]) {

        if(myarray.length === 2)
        {
            this.id = myarray[0];
            this.act = myarray[1];
        }
        if(myarray.length===1)
        {
            this.act = myarray[0];
        }

    }

   

    
}