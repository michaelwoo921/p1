export class Trms {
    // [key: string]: any;
    name: string = '';
    date: string= '';  // 2020-1-4 
    start_date: string= ''; //2020-3-10
    location: string= '';
    description: string= '';
    cost: number =0;
    supervisor_name: string= '';
    grading_format: string= ''; //from reference table
    event_type: string= '';
    justification: string= '';
    attachments?: Attachments[];
    pro_reimbursement?: string|number;  //ready only

}

export interface Attachments {
    type: string;
    approvals: string[];  // if .msg included
    time_off: string;
}