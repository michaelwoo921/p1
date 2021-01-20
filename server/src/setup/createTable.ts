import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import trmsService from '../trms/trms.service';
import { Trms } from '../trms/trms';


// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'p1-users'
};

const removeTrms = {
    TableName: 'p1-trms'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'p1-users',
    StreamSpecification: {
        StreamEnabled: false
    }
};


const trmsSchema ={
    AttributeDefinitions: [
        { 
            AttributeName: 'name',
            AttributeType: 'S'
        },
        { 
            AttributeName: 'date_created',
            AttributeType: 'S'
        },

    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'date_created',
            KeyType: 'RANGE'
        },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'p1-trms',
    StreamSpecification: {
        StreamEnabled: false
    }
}
ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 10000);
});



ddb.deleteTable(removeTrms, function(err, data){
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(trmsSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateTrmsTable();
                }, 10000);
            }
        });
    }, 10000);
})

function populateUserTable() {
    let currentYear: number = (new Date()).getFullYear();
    userService.addUser({name: 'Michael', password: 'pass', role: 'Employee', year: 2018, supervisor_name: 'Richard', fund: 600, fund_available: 600}).then(()=>{});
    userService.addUser({name: 'Chris', password: 'pass', role: 'Employee', year: 2020, supervisor_name: 'Jim', fund: 800, fund_available: 800}).then(()=>{});
    userService.addUser({name: 'Elisa', password: 'pass', role: 'Employee', year: currentYear,  supervisor_name: 'Jim', fund: 800, fund_available: 800}).then(()=>{});
 
    userService.addUser({name: 'Jim', password: 'pass', role: 'Supervisor',  year: currentYear, supervisor_name: 'David', fund: 1000, fund_available: 1000}).then(()=>{});
    userService.addUser({name: 'Richard', password: 'pass', role: 'Supervisor', year: currentYear, supervisor_name: 'David', fund: 1000, fund_available: 1000}).then(()=>{});

    userService.addUser({name: 'David', password: 'pass',  role: 'DeptHead', year: currentYear,  
    supervisor_name: 'Benco', fund: undefined, fund_available: undefined}).then(()=>{});
    userService.addUser({name: 'Benco', password: 'pass', role: 'Benco', year: currentYear, 
    supervisor_name: 'King', fund: undefined, fund_available: undefined}).then(()=>{});
    userService.addUser({name: 'King', password: 'pass', role: 'BencoSup', 
    year: currentYear, supervisor_name: '', fund: undefined, fund_available: undefined}).then(()=>{});

}


function populateTrmsTable() {
    function formatDate(d: Date): string {
        return d.toISOString().split('T')[0];
    }


    trmsService.addTrms(
        {name: 'Michael', date_created: '2020-08-25', role: 'Employee', event_start_date: '2021-01-12', 
        event_end_date:'2021-02-25',
        event_location: 'online',  supervisor_name: 'Richard', event_description: 'backend developmewnt',
        event_name: 'Nodejs with TypeScript',   event_cost: 100,  event_type: 'Certification Preparation Classes', 
        pro_reimbursement:  80  ,
        justification: 'needed for job',
        attachments: '', grade: '', comments: '',
        approval: {
            sup: {date: '', reason:'', status:'', additional_info: ''},
            head: {date: '', reason:'', status:'', additional_info: ''},
            benco: {date: '', reason:'', status:'', additional_info: ''}
        }
    }
    );

    trmsService.addTrms(
        {name: 'Michael', date_created: '2021-01-10', role: 'Employee', event_start_date: '2021-02-20', 
        event_end_date: '2021-04-15',
        event_location: 'online',  supervisor_name: 'Richard', event_description: 'Native App for android and IOS',
        event_name: 'React Native with Redux',   event_cost: 500,  event_type: 'Certification Preparation Classes', 
        pro_reimbursement:  375  ,
        justification: 'requires a good understanding of noSql DB to serve customers with better app experience',
        attachments: '', grade: '', comments: '',
        approval: {
            sup: {date: '', reason:'', status:'', additional_info: ''},
            head: {date: '', reason:'', status:'', additional_info: ''},
            benco: {date: '', reason:'', status:'', additional_info: ''}
        }
    }
    );
 
    trmsService.addTrms(
        {name: 'Elisa', date_created: formatDate(new Date()), role:'Employee', event_start_date: '2021-05-12', 
        event_end_date: '2021-06-13', event_location: '',
        supervisor_name: 'Jim', event_name: 'Postgres', 
            event_description: '', event_cost: 500, event_grading_format: '', event_type: 'University Courses', justification: '', 
            attachments: '', grade: '', comments: '', pro_reimbursement: 300,
            approval: {
                sup: {date: '', reason:'', status:'', additional_info: ''},
                head: {date: '', reason:'', status:'', additional_info: ''},
                benco: {date: '', reason:'', status:'', additional_info: ''}
            }
        }
    );
    
    trmsService.addTrms(
        {name: 'Richard', date_created: formatDate(new Date()), role:'Supervisor', event_start_date: '2021-05-12',
        event_end_date: '2021-05-12', event_location: '',
        supervisor_name: 'David', event_name: 'Augular', 
            event_description: '', event_cost: 500, pro_reimbursement: 400, event_grading_format: '', event_type: 'Certification', justification: '', 
            attachments: '', grade: '', comments: '',
        
            
            approval: {
                sup: {date: '', reason:'', status:'', additional_info: ''},
                head: {date: '', reason:'', status:'', additional_info: ''},
                benco: {date: '', reason:'', status:'', additional_info: ''}
            }
        }
    );


}
