import {Routing} from 'express-zod-api'
import {helloEndpoint} from './endpoints/hello'
import {loginCodeEndpoint, loginEmailEndpoint, registerEmailEndpoint} from './endpoints/login'

export const routing: Routing = {
  hello: helloEndpoint,
  registerEmail: registerEmailEndpoint,
  loginEmail: loginEmailEndpoint,
  loginCode: loginCodeEndpoint,
}
