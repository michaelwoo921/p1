let currentYear: number = (new Date()).getFullYear();
export class User {   
    name='';
    password='';
    role='';     // Employee, Supervisor, DeptHead, Benco, BencoSupervisor
    year=currentYear;
    supervisor_name='';
    fund: number=0;
    fund_available =0;
}