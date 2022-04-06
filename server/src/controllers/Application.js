import { ApplicationModel } from './../models';
const {saveDetails}= ApplicationModel; 

const create = async(request, respose) => {
    const {body}= request;
    try{
       const data= await saveDetails(body);
    respose.status(200).send({ message: 'success', data: data })
}catch(err){
    respose.status(500).send({isError: true, message:'Error while creating payload' });
}
}

const ApplicationController = {
    create
}
export default ApplicationController