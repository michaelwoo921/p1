import { DocumentClient} from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;

    constructor(){
        this.doc = dynamo;
    }

    async getUsers(): Promise<User[]> {
        const params = {
            TableName: 'users'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        })
    }


    async getUserByName(name: string): Promise<User| null>{

        const params ={
            TableName: 'p1-users',
            Key: {
                'name': name
            }
        };

        return this.doc.get(params).promise().then(data =>{
            if(data && data.Item){
                logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as User;
            }
            else {
                return null;
            }
        });
    };

    async addUser(user: User): Promise<boolean>{
        const params ={
            TableName: 'p1-users',
            Item: user,
            ConditionExpression: '#name <> :name',
            ExpressionAttributeNames: {
                '#name': 'name',
            },
            ExpressionAttributeValues: {
                ':name': user.name,
            }
        };
        return await this.doc.put(params).promise().then(result => {
            logger.info('successfully created item');
            return true;
        }).catch(err => {
            logger.error(err);
            return false;
        })
    }

    async updateUser(user: User) {
        const params = {
            TableName: 'p1-users',
            Key: {
                'name': user.name
            },
            UpdateExpression: 'set #password = :p, #fund = :f, #year = :y',
            ExpressionAttributeValues: {
                ':f': user.fund,
                ':p': user.password,
                ':y': user.year
            },
            ExpressionAttributeNames: {
                '#password': 'password',
                '#fund': 'fund',
                '#year': 'year'
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.debug(data);
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }
}

const userService = new UserService();


export default userService;