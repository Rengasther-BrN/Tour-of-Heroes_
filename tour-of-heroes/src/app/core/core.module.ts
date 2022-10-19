import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { MaterialModule } from '../material/material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

const CORE_COMPONENTS = [
  ConfirmationDialogComponent,
  LoadingComponent,
  MessagesComponent,
  PageNotFoundComponent,
  ToolbarComponent,
];
const MODULES = [FlexLayoutModule, IconsModule, MaterialModule, RouterModule];

@NgModule({
  declarations: [CORE_COMPONENTS],
  imports: [CommonModule, MODULES],
  exports: [CORE_COMPONENTS],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  
  // Uma vez que o CoreModule que o core module foi importado em algum lugar do sistema, dai o parentModule terá um valor do carregamento do core     module
  
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    
    // No momento que o CoreModule tentar ser carregado pela segunda vez
    if (parentModule) {
      throw new Error(
        'CoreModule já foi carregado. Importe este módulo apenas no AppModule.'
      );
    }
  }
}
