import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Collection } from './components/collection/collection';
import { Uploader } from './components/uploader/uploader';


export const routes: Routes = [
    { path: '', component: Home, },
    { path: 'collections', component: Collection, },
    { path: 'create', component: Uploader, },
];
