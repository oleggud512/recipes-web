export class Route {
  constructor(args: { 
    name: string, 
    displayName: string, 
    href: string 
  })

  isCurrent(): boolean
}

export class Router {
  constructor(routes: Route[])

  navigateTo(routeName: string, args: { pathParams: any, query: any })
}