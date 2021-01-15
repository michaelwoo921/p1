

let currentYear: number = (new Date()).getFullYear();
export class User {   
    username='';
    password='';
    role='';     // Employee, Supervisor, DeptHead, Benco, BencoSupervisor
    year=currentYear;
    supName?: string;
    fund: number | undefined;
}