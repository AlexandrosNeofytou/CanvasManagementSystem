import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { ViewOwnCanvasesComponent } from './_pages/view-own-canvases/view-own-canvases.component';
import { CreateCanvasFormComponent } from './_pages/create-canvas-form/create-canvas-form.component';
import { WizardComponent } from './_pages/wizard/wizard.component';
import { CanvasViewComponent } from './_pages/canvas-view/canvas-view.component';
import { BrowseCanvasesComponent } from './_pages/browse-canvases/browse-canvases.component';
import { VerifyEmailComponent } from './_pages/verify-email/verify-email.component';
import { EmailVerificationComponent } from './_pages/email-verification/email-verification.component';
import { AccountVerifiedComponent } from './_pages/account-verified/account-verified.component';

const routes: Routes = [

  
  {path:"",component:HomeComponent},

  {path:"", children:[

    {path:"view-own-canvases", component:ViewOwnCanvasesComponent},
    {path:"create-canvas-form/:canvasId",component:CreateCanvasFormComponent},
    {path:"create-canvas-form",component:CreateCanvasFormComponent},
    {path:"wizard/:canvasId",component:WizardComponent},
    {path:"canvas-view/:canvasId/:canvasName",component:CanvasViewComponent},
    {path:"broswe-canvases",component:BrowseCanvasesComponent},
    {path:"verify-email/:email",component:EmailVerificationComponent},
    {path:"account-verified",component:AccountVerifiedComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
