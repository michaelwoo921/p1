import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import trmsService from '../trms/trms.service';


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
            AttributeName: 'date',
            AttributeType: 'S'
        },

    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'date',
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
    userService.addUser({name: 'Elisa', password: 'pass', role: 'Employee', year: currentYear,  supName: 'Susan', fund: 1000}).then(()=>{});
    userService.addUser({name: 'Susan', password: 'pass', role: 'Supervisor',  year: currentYear, supName: 'David', fund: 1000}).then(()=>{});
    userService.addUser({name: 'David', password: 'pass',  role: 'DeptHead', year: currentYear,  supName: 'Benco', fund: undefined}).then(()=>{});
    userService.addUser({name: 'Benco', password: 'pass', role: 'Benco', year: currentYear, supName: 'King', fund: undefined}).then(()=>{});
    userService.addUser({name: 'King', password: 'pass', role: 'BencoSup', year: currentYear, supName: undefined, fund: undefined}).then(()=>{});
    userService.addUser({name: 'Michael', password: 'pass', role: 'Employee', year: currentYear, supName: 'Richard', fund: 1000}).then(()=>{});
    userService.addUser({name: 'Richard', password: 'pass', role: 'SuperVisor', year: currentYear, supName: 'David', fund: 1000}).then(()=>{});
}


function populateTrmsTable() {
    function formatDate(d: Date): string {
        return d.toISOString().split('T')[0];
    }

    trmsService.addTrms(
        {name: 'Michael', date: formatDate(new Date()), start_date: '2020-05-12', location: '',
        supervisor_name: 'Richard',
         description: '', cost: 500, grading_format: '', event_type: '', justification: '', pro_reimbursement: 320
        }
    );
    trmsService.addTrms(
        {name: 'Elisa', date: formatDate(new Date()), start_date: '2020-05-12', location: '',
        supervisor_name: 'Susan',
            description: '', cost: 500, grading_format: '', event_type: '', justification: '', pro_reimbursement: 320
        }
    );
     



    }
