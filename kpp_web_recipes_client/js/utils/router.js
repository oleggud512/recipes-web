class Route {
  constructor(args) {
    this.name = args.name
    this.displayName = args.displayName ?? args.name
    this.href = args.href
  }

  isCurrent() {
    return window.location.href.endsWith(this.href)
  }
}

class Router {
  constructor(routes) {
    this.routes = routes
  }

  navigateTo(routeName, args = {}) {
    const { query, pathParams } = args
    
    const route = this.routes.find(r => r.name == routeName)
    
    const templateUrl = new URL(route.href)
    const updatedPathname = templateUrl.pathname.split('/')
      .map(s => s.startsWith(':') ? pathParams[s.slice(1)] : s)
      .join('/')
    const queryString = new URLSearchParams(query).toString()
    
    const url = new URL(templateUrl.origin + updatedPathname + queryString)

    
    history.pushState({}, "", url)
    window.location.replace(url)
    console.log('trying to navigate to ' + url)
  }
}

module.exports = {
  Route,
  Router
}