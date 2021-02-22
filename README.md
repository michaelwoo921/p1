# Tuition ReimburseMent Management System (TRMS)

## Project Description

TRMS, or Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications. These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator while the employee is able to track the status of their requests.

## Technologu Used

* React
* Redux
* TypeScript
* Nodejs
* Express.js
* DynamoDB 

## Features

* As an Employee, I can submit a completed Tuition Reimbursement Form one week prior to the start of the event
  
* As a Direct Supervisor, I can approve or deny my worker's submitted TRMS form
* As a Department Head, I can approve or deny worker's TRMS form previously approved by Worker's Supervisor.
*  As a Benco, I can provide approval for Tuition Reimbursement
  
## Business Rules

* Each employee is allowed to claim up to $1000 in tuition reimbursement a year
* The amount available to an employee is reset on the new year
* Event types have different standard reimbursement coverage:
  * University Coverage: 80%
  * Seminars 60%
  * Certification Preparation Classes 75%
  * Certification 100%
  * Technical Training 90%
* The projected reimbursement for an event cannot exceed the amounrt available for an employess to reimburse 
  * The amount available = TotalReimbursement -  pendingReimbursement - AwaredReimbursements

## Getting Started

1. git clone <repo_name>
2. cd to server and client then npm install for both
