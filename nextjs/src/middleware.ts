import type { NextRequest } from 'next/server'
import { NextResponse} from 'next/server'
import { verify } from 'jsonwebtoken'
const secret = process.env.SECRET;

type Middleware = (request: NextRequest) => NextResponse

const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get('OursiteJWT')?.value

  if (authSession) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
// const { cookies } = request
// const jwt = cookies.OursiteJWT
// const { url } = req
// if (url.includes('/')) {
//   if (jwt === undefined) {
//     NextResponse.redirect('/login')
//   }
//   try {
//     const user = verify(jwt, secret)
//     console.log(user)
//     NextResponse.next()
//   } catch (e) {
//     NextResponse.redirect('/login')
//   }
// }
// return NextResponse.next()

const authenticated: Middleware = (request) => {
  const authSession = request.cookies.get('OursiteJWT')?.value

  if (!authSession) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.set({
      name: 'redirect',
      value: request.url,
    })
    return response
  }

  return NextResponse.next()
}

export default function middleware(request: NextRequest) {
  if ([
    '/login',
    '/register',
  ].includes(request.nextUrl.pathname)) {
    return redirectIfAuthenticated(request)
  }

  if ([
    '/',
    '/pokemons',
    '/pokemons/client',
  ].includes(request.nextUrl.pathname)) {
    return authenticated(request)
  }

  return NextResponse.next()
}
