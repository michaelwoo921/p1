import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import {Trms } from './trms';


class TrmsService{
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async getTrmss(): Promise<Trms[]> {
        const params = {
            TableName: 'p1-trms'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Trms[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async getTrms(nam: string, dt: string): Promise<Trms | null> {
        const params = {
            TableName: 'p1-trms',
            Key: {
                'name': nam,
                'date': dt
            }
        }
        return await this.doc.get(params).promise().then((data) => {
            return data.Item as Trms;
        }).catch((err) => {
            logger.error(err);
            return null;
        });
    }

    
    async updateTrms(trms: Trms): Promise<boolean> {
        console.log(trms);
        const params = {
            TableName: 'p1-trms',
            Key: {
                'name': trms.name,
                'date': trms.date
            },
            UpdateExpression: 
            'set #sup_approval=:s, #head_approval=:h, #benco_approval=:b, #pro_reimbursement=:p',
            ExpressionAttributeValues: {
                ':s': trms.sup_approval,
                ':h': trms.head_approval,
                ':b': trms.benco_approval,
                ':p': trms.pro_reimbursement,
            },
            ExpressionAttributeNames: {
                '#sup_approval': 'sup_approval', 
                '#head_approval':  'head_approval', 
                '#benco_approval': 'benco_approval', 
                '#pro_reimbursement': 'pro_reimbursement',
            },
            ReturnValue: 'UPDATED_NEW'
        };

        return await this.doc.update(params).promise().then(() => {
            logger.info('Successfully updated restaurant');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        })
    }

    async addTrms(trms: Trms): Promise<boolean> {
        const datayorb = {...trms };

        const params = {
            TableName: 'p1-trms',
            Item: datayorb,
            ConditionExpression: '#name <> :name AND #d <> :date',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#d': 'date'
            },
            ExpressionAttributeValues: {
                ':name': datayorb.name,
                ':date': datayorb.date
            }
        }
        return await this.doc.put(params).promise()
        .then(result =>{
            logger.info('successfully added items');
            return true;
        })
        .catch(err => {
            logger.error(err);
            return false;
        })

        return true;
    }




    async deleteTrms(name: string, date: string): Promise<Boolean> {
        const params = {
            TableName: 'p1-trms',
            Key: {
                'name': name,
                'date': date
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch((err) => {
            logger.error(err);
            return false;
        });
    }


}

const trmsService = new TrmsService();
export default trmsService;