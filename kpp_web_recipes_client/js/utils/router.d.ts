export class Route {
  constructor(args: { 
    name: string, 
    displayName: string, 
    href: string,
    nav: boolean = false
  })

  isCurrent(): boolean
}

export class Router {
  constructor(routes: Route[])

  routes: Route[]
  navigation: Route[]

  navigateTo(routeName: string, args: { pathParams: any, query: any })
}