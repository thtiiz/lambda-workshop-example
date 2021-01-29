import AWS from 'aws-sdk'

const SERVICE_NAME = process.env.SERVICE_NAME
const SQS_ENDPOINT = process.env.SQS_ENDPOINT

export const list = async (event) => {
  // business logic
  const items = [{ id: 1, name: 'test1', id: 2, name: 'test2' }]

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: items,
    }),
  }
}

export const notify = async (event) => {
  // business logic

  const sqs = new AWS.SQS()

  const res = await sqs
    .sendMessage({
      MessageBody: JSON.stringify({ message: SERVICE_NAME }),
      QueueUrl: SQS_ENDPOINT,
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `notify complete ${res.MessageId}`,
    }),
  }
}
