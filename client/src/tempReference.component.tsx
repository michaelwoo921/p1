// import react from 'react';

export default function(){
    return (
        <div>
            <header>
			<h1> Tuition Reimbursement Management System</h1>
			<p> Employee: $1000 each year, reset each year </p>
			<h2> Event types </h2>
			<p> University courses 80%</p>
			<p> Seminars 60%</p>
			<p> Certification Preparation Classes 75%</p>
			<p> Certification 100%</p>
			<p> Technical Training 90%</p>
			<p> Others 30%</p>
			<h2> After Benco Approval: pending</h2>
			<p> passing grade or presentation over the event</p>
			<p> available reimbursement = total reimbursement - pending reim - awarded reim</p>
			<p> projected reim is smaller than available reim</p>
			<p> do not cover books</p>
		</header>
		<section>
			<h2> Tution Reimbursement Form </h2>
			<p>should be  completed  one week prior to the start of the event</p>
			<p> basic employee info, date, time , location, description, cost, grading format, type of event, work related justification</p>
			<ul> optional: 
				<li>file attachment (pdf, png, jpeg, txt, doc, </li>
				<li>attachment of approvals already given .msg (outlook email file), type of approval,  </li>  
				<li> work time to be missed
					</li>
					</ul>
			<p> projected reimbursement : read-only field</p>
		</section>

		<section>
			<h3> Business Rules</h3>
			<p> Grading format from reference table</p>
			<p> some grading format: presentation to management or passing grade prior to awarded reimbursement</p>
			<p> passing grade cutoff date  or use default passing grade if unknown</p>
			<p> if approval email provided then that approval step is skipped</p>
			<p> cannot skip Benco approval</p>
			<p> request is marked urgent if the course is less than 2 weeks from the start</p>
		</section>
		<section>
			<h2> Direct supervisor approval</h2>
			<p> supervisor can request additional info from the employee before approval</p>
			<p>must  provide the reason for denial</p>
			<p> direct supervisor is department head then one approval skipped</p>
			<p> not approved in a timely manner then auto approval</p>
		</section>
		<section> 
			<h2> Department Head Approval</h2>
			<p> can request addition info from direct supervisor or employee before approval</p>
			<p> not approved in a timely manner then auto approved</p>
		</section>
		<section>
			<h2> BenCo Approval</h2>
			<p> cannot be skipped</p>
			<p> can ask additional info from the employee, supervisor, head</p>
			<p> can change the reimbursement amount then should be notified and given the option to cancel</p>
			<p> not approved in a timely manner then escalation email should be sent to Benco's direct supervisor</p>
			<p> Benco can award the amount  more than the available amount: must provide reason and marked as exceeding available funds for reporting purposes</p>
		</section>
		<section>
			<h2> Grade/Presentation upload</h2>
			<p> attach grade or presentation</p>
			<p> after grade upload: Benco must confirm </p>
			<p> after presentation upload: the direct supervisor confirm that the presentation is satisfactory and presented to the appropriate parties</p>
			<p> Upon confirmation, the amount is awarded to the requestor</p>
			<p> Only interested party has access the grade/presentation: requestor and approver</p>
		</section>
        </div>
    )
}