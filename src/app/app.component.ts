import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { EstadoSidebarService } from './core/services/estado-sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecovolun-app';

  readonly sideBar = inject(EstadoSidebarService)

}
