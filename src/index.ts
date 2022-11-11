import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin:'*',// 'http://localhost:3000'
    methods: ['GET','POST','PUT','DELETE']

}))
app.listen(8000,()=> {
    console.log(`L'api est en route sur l'adresse localhost:8080`
)})