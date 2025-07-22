import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { NgMaterialsModule } from './ng-materials/ng-materials.module';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Footer, Header, NgMaterialsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gallery');
}
