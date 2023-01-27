const mqtt = require('mqtt')
require('dotenv').config({ path: '../.env', override: true })

const clientId = `mqtt_valogw${Math.random().toString(16).slice(3)}`

const connectUrl = process.env.MQTT_BROKER_URL
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  reconnectPeriod: 1000,
})

const sub_topic = 'stat/light/#'
const pub_topic = 'cmnd/light/veranta/POWER'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([sub_topic], () => {
    console.log(`Subscribe to topic '${sub_topic}'`)
  })
  client.publish(pub_topic, 'ON', { qos: 1, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
