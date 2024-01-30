import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { WhiteTitledBoxComponent } from "./_utility/white-titled-box/white-titled-box.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './_form/input-field/input-field.component';
import { ViewOwnCanvasesComponent } from './_pages/view-own-canvases/view-own-canvases.component';
import { NavbarComponent } from './_utility/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateCanvasButtonComponent } from './_utility/create-canvas-button/create-canvas-button.component';
import { CreateCanvasFormComponent } from './_pages/create-canvas-form/create-canvas-form.component';
import { AuthTokenInterceptor } from './_interceptors/auth-token.interceptor';
import { SpinnerComponent } from './_utility/spinner/spinner.component';
import { SpinnerInterceptor } from './_interceptors/spinner-interceptor.interceptor';
import { CanvasCardComponent } from './_utility/canvas-card/canvas-card.component';
import { PaginationComponent } from './_utility/pagination/pagination.component';
import { RepeatDirective } from './_directives/repeat.directive';
import { WizardComponent } from './_pages/wizard/wizard.component';
import { AnswerSectionComponent } from './_utility/answer-section/answer-section.component';
import { CanvasViewComponent } from './_pages/canvas-view/canvas-view.component';
import { CanvasGridSectionComponent } from './_utility/canvas-grid-section/canvas-grid-section.component';
import { DescriptionComponent } from './_utility/description/description.component';
import { CommentSectionComponent } from './_utility/comment-section/comment-section.component';
import { CommentCardComponent } from './_utility/comment-card/comment-card.component';
import { BrowseCanvasesComponent } from './_pages/browse-canvases/browse-canvases.component';
import { SearchBarComponent } from './_utility/search-bar/search-bar.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { VerifyEmailComponent } from './_pages/verify-email/verify-email.component';
import { EmailVerificationComponent } from './_pages/email-verification/email-verification.component';
import { AccountVerifiedComponent } from './_pages/account-verified/account-verified.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        InputFieldComponent,
        ViewOwnCanvasesComponent,
        WhiteTitledBoxComponent,
        NavbarComponent,
        CreateCanvasButtonComponent,
        CreateCanvasFormComponent,
        SpinnerComponent,
        CanvasCardComponent,
        PaginationComponent,
        RepeatDirective,
        WizardComponent,
        AnswerSectionComponent,
        CanvasViewComponent,
        CanvasGridSectionComponent,
        DescriptionComponent,
        CommentSectionComponent,
        CommentCardComponent,
        BrowseCanvasesComponent,
        SearchBarComponent,
        VerifyEmailComponent,
        EmailVerificationComponent,
        AccountVerifiedComponent,
    ],
    providers: [
        {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
        {provide:HTTP_INTERCEPTORS,useClass:AuthTokenInterceptor,multi:true},
        {provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true}
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule
        
    ]
})
export class AppModule { }
