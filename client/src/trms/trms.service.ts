import axios from 'axios';
import { Trms } from './trms';

class TrmsService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/trmss';
    }

    getTrmss(): Promise<Trms []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getTrms(nam: string, dt: string): Promise<Trms> {
        return axios.get(this.URI+'/'+nam + '/'+dt).then(result=>{
            console.log(JSON.stringify(result.data), 'getTrms data');
           return result.data;
        });
    }
    addTrms(t: Trms): Promise<null> {
        return axios.post(this.URI, t).then(result => null);
    }
    updateTrms(t: Trms): Promise<null> {
        return axios.put(this.URI, t).then(result => null);
    }

    deleteTrms(nam: string, dt: string): Promise<null> {
        console.log(nam, dt);
        return axios.delete(this.URI+'/'+nam + '/' + dt, {withCredentials: true}).then(result => null)
    }
}

export default new TrmsService();