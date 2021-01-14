
export class Trms {
    name: string = '';
    date: string= '';  // 2020-1-4 
    start_date: string= ''; //2020-3-10
    location: string= '';
    description: string= '';
    cost: number =0;
    grading_format: string= ''; //from reference table
    event_type: string= '';
    supervisor_name: string='';
    justification: string= '';
    attachments?: Attachments[];
    pro_reimbursement?: string|number;  //ready only
    sup_approval?: any[] =[]; // ['yes', datestring] 
    head_approval?: any[]= [];
    benco_approval?: any[]= [];
    constructor(){

    }
}

export interface Attachments {
    type: string;
    approvals: string[];  // if .msg included
    time_off: string;
}