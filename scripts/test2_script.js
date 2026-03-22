import http from 'k6/http'
import { sleep, check } from 'k6'

export default function () {
  const url = 'https://born-4-more-laravel-staging-aujl5y.laravel.cloud/api/users/sign-up'

  const payload = {
    email: 'arvin.saguisa+4@kodakollectiv.com',
    password: 'password',
    password_confirmation: 'password',
  }

  const params = {
    headers: {
      // ✅ JSON (Postman: raw → JSON)
      'Content-Type': 'application/json',

      // ✅ Form URL Encoded (Postman: x-www-form-urlencoded)
      // 'Content-Type': 'application/x-www-form-urlencoded',

      // ✅ Multipart Form Data (Postman: form-data, especially with files)
      // NOTE: Usually k6 auto-handles this, so you can omit header
      // 'Content-Type': 'multipart/form-data',

      // ✅ Plain Text (Postman: raw → Text)
      // 'Content-Type': 'text/plain',

      // ✅ XML (Postman: raw → XML)
      // 'Content-Type': 'application/xml',

      // ✅ Binary File Upload (Postman: binary)
      // 'Content-Type': 'application/octet-stream',

      // ✅ GraphQL (usually sent as JSON)
      // 'Content-Type': 'application/json',

      // ✅ HTML (rare, but possible)
      // 'Content-Type': 'text/html',
    },
  }

  //GET METHOD sample
  //const res = http.get(url) //for GET request (no body)
  //const res = http.get(url, params) //With params

  //POST METHOD – JSON (raw → JSON in Postman)
    //   const res = http.post(
    //   url,
    //   JSON.stringify(payload),
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )

  //POST METHOD – form-data (Postman: form-data)
  //const res = http.post(url, payload)

  //POST – x-www-form-urlencoded
  //const res = http.post(url, payload)

  //POST – with query params
  //const res = http.post(`${url}?page=1&limit=10`, payload)

//POST – with headers (auth, tokens, etc.)
//   const res = http.post(
//   url,
//   JSON.stringify(payload),
//   {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer YOUR_TOKEN',
//     },
//   }
// )

//PUT (update)
//   const res = http.put(
//   url,
//   JSON.stringify(payload),
//   {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
// )

//PATCH (partial update)
// const res = http.patch(
//   url,
//   JSON.stringify(payload),
//   {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
// )

//DELETE
//const res = http.del(url)

//DELETE (with headers)
// const res = http.del(url, null, {
//   headers: {
//     Authorization: 'Bearer YOUR_TOKEN',
//   },
// })

//File Upload (multipart/form-data with file)
// const file = open('./image.png', 'b')
// const payload = {
//   file: http.file(file, 'image.png'),
// }
// const res = http.post(url, payload)


//GraphQL
// const res = http.post(
//   url,
//   JSON.stringify({
//     query: `
//       query {
//         users {
//           id
//           name
//         }
//       }
//     `,
//   }),
//   {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
// )

// Binary Upload
// const file = open('./file.zip', 'b')

// const res = http.post(url, file, {
//   headers: {
//     'Content-Type': 'application/octet-stream',
//   },
// })


  const res = http.post(url, JSON.stringify(payload), params)

  check(res, {
    'status is 200 or 400': (r) =>
      r.status === 200 || r.status === 400,

    'if success, message is correct': (r) =>
      r.status !== 200 || r.body.includes('success'),

    'if duplicate, message is correct': (r) =>
      r.status !== 400 || r.body.includes('already registered'),
  })

  // console.log(`Status: ${res.status}`)
  // console.log(`Response: ${res.body}`)

  sleep(1)
}