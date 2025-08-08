import { loadRemoteModule } from "@angular-architects/module-federation";
import { Route } from "@angular/router";
import { MICRO_FRONTS, getDomain } from "../core/constants";

const pathsRoutes: { [key: string]: string } = {
    [MICRO_FRONTS.AUTH.name]: `${getDomain('AUTH')}/remoteEntry.js`,
    [MICRO_FRONTS.HOME.name]: `${getDomain('HOME')}/remoteEntry.js`,
};
  
/**
 *
 * @param microRemoteName nombre del microFront - este valor es utilizado para obtener el servidor donde se debe obtener el js remoto.
 * @param path ruta donde va a vivir el modulo del microfront
 * @param exposedModule nombre del modulo expuesto en el webpack.config. valor por defecto `./Module`.
 * @param moduleName nombre del modulo expuesto. valor por defecto `RemoteEntryModule`
 * @return Route
 */
export function formatRoute(
    microRemoteName: string,
    path: string,
    exposedModule = "./Module",
    moduleName = "RemoteEntryModule",
    isPrivate = false
) {
const routeConfig: Route = {
    path: path,
    loadChildren: () =>
    loadRemoteModule({
        type: "module",
        remoteEntry: pathsRoutes[microRemoteName],
        exposedModule,
    }).then((m) => m[moduleName]),
    // resolve: { pageData: SeoResolver },
    data: { microRemoteName },
};
    //   if (isPrivate) {
    //     routeConfig.canActivate = [ValidateLoginAndComponetizationGuard];
    //   }
    return routeConfig;
}