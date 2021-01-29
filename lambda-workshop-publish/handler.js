import axios from 'axios'
import qs from 'qs'

const LINE_NOTIFY_ENDPOINT = process.env.LINE_NOTIFY_ENDPOINT
const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN

export const publish = async (event) => {
  const { Records } = event
  const parsedBody = Records.map((record) => JSON.parse(record.body)).filter((body) => !!body.message)
  console.log(parsedBody)
  await Promise.all(parsedBody.map((body) => postToLine(body.message)))

  return { message: `notify ${parsedBody.length}` }
}

const postToLine = async (message) => {
  await axios.post(
    LINE_NOTIFY_ENDPOINT,
    qs.stringify({ message: `Hello from service-${message} at ${new Date().toISOString()}` }),
    {
      headers: { Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`, 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}
