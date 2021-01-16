

let currentYear: number = (new Date()).getFullYear();
export class User {   
    name='';
    password='';
    role='';     // Employee, Supervisor, DeptHead, Benco, BencoSupervisor
    year=currentYear;
    supName?: string;
    fund: number | undefined;
}