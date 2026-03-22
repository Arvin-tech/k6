import http from 'k6/http' //import http module from k6
import { check, sleep } from 'k6' //import check and sleep modules directly

// 1. Test Configuration - define number of concurrent users, ang duration sa test, and thresholds
export const options = {
  vus: 10, // number of virtual users
  duration: '30s', // total test duration
  thresholds: {
    http_req_duration: ['p(95)<500'], // Pass/Fail criteria: 95% of requests should be under 500ms
  },
}

// 2. Base Configuration - define base URL/api url so that we avoid hardcoding URLs everywhere
// tawagon ra nimo ang BASE_URL variable, mao ni katong {{STAGING}} sa Postman
const BASE_URL = __ENV.BASE_URL || 'https://example.com' //command to run: k6 run --env BASE_URL=https://example.com scripts/test_structure_script.js

// 3. Default Headers or reusable headers. Pwede nimo i-define diri ang common headers nga imong gusto i-include sa tanan requests, like Content-Type or Authorization tokens
const defaultHeaders = {
  'Content-Type': 'application/json',
}

// 4. Main Test Function
export default function () {

  // 4.1 Endpoint - define the specific endpoint or API route nga imong gusto i-test, usually in combination sa base URL
  const url = `${BASE_URL}/api/users/sign-up`

  // 4.2 Request Payload - depende sa imong test case, pwede nimo i-define ang payload nga imong gusto i-send sa request body, usually in JSON format
  //pwede pod e simulate nga lahi og payloads para sa lain laing virtual users, para mas realistic ang test nimo
  const payload = JSON.stringify({
    // email: 'arvin.saguisa@kodakollectiv.com',
    // password: 'password',
    // password_confirmation: 'password',
  })

  // 4.3 Request Parameters - pwede nimo i-include ang headers, query params, or even authentication tokens depende sa imong test case
  //example it needs authentication token, pwede nimo i-add sa headers
  const params = {
    headers: defaultHeaders,
    
  }

  // 4.4 Execute Request - pwede nimo i-try ang lain-laing HTTP methods (GET, POST, PUT, DELETE) depende sa imong test case
  // GET request sample
  // const res = http.get(url, params)
  const res = http.post(url, payload, params) //pero kani post request ni since ga signup manta so http.post

  // 4.5 Validations sa imong test, unsay expect nimo nga resulta, pwede nimo i-validate ang status code, response time, or even specific content sa response body
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })

  //other checking example gi check nato if success or duplicate email sha, depende sa response body
  check(res, {
    'status is 200 or 400': (r) =>
      r.status === 200 || r.status === 400,

    'if success, message is correct': (r) =>
      r.status !== 200 || r.body.includes('success'),

    'if duplicate, message is correct': (r) =>
      r.status !== 400 || r.body.includes('already registered'),
  })

  // 4.6 Think Time - pwede nimo i-simulate ang real user behavior by adding sleep time between requests, para dili magpadagan tanan requests in a tight loop
  sleep(1)
}