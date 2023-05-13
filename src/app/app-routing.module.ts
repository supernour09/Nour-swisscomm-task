import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {dashboardUrl} from "./dashboard/dashboard.constants";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: dashboardUrl
    },
    {
        path: dashboardUrl,
        loadChildren: () => import(`./dashboard/dashboard.module`).then((m) => m.DashboardModule),
    },
    {
        path: '**',
        redirectTo: dashboardUrl
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
