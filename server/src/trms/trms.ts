import formatDate from '../formatDate';
export class Trms {
    name: string = '';
    supervisor_name: string='';
    date_created= formatDate(new Date());  // 2020-1-4 
    event_name = '';
    event_type: string= '';
    event_start_date: string= ''; //2020-3-10
    event_location: string= '';
    event_description: string= '';
    event_cost: number =0;
    event_grading_format?: string= ''; //from reference table
    justification? ='';
    pro_reimbursement?: string|number;  //ready only
    attachments?: Attachment[]=[];
    approval?: Approval[]=[];
    time_off?: string[]=[];

    constructor(nam:string, dt: string){
        this.name =nam; this.date_created = dt;
    }
}



export interface Attachment {
    type: string;
}


export interface Approval {
    type: string;  // benco, supervisor, or head
    date: string;  // if .msg included
    status: string; // yes or no or ''
    reason? : string; // reason for denial if any
}