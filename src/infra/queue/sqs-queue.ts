import SQS from "aws-sdk/clients/sqs"

const S = new SQS()

export const Teste = async () => { 

S.getQueueUrl({QueueName: "FILA_DE_TESTE"}, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrl);
    }
  });

}