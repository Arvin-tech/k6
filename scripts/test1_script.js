import http from 'k6/http' //import http module from k6
import { sleep } from 'k6' //import sleep module directly

// Simulated user behavior
export default function () {
  http.get("http://k6.io"); //url or api
  sleep(1);
 
}
