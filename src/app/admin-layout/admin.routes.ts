import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./admin-layout').then(c => c.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('../admin-overview/admin-overview').then(c => c.AdminOverview), },
      { path: 'users', loadComponent: () => import('../users/users').then(c => c.Users), },
      { path: 'users/:id', loadComponent: () => import('../users/view/user-view').then(c => c.UserView), },
      { path: 'professions', loadComponent: () => import('../professions/professions').then(c => c.Professions), },
      { path: 'professions/:id', loadComponent: () => import('../professions/view/profession-view').then(c => c.ProfessionView), },
      { path: 'tests', loadComponent: () => import('../tests/tests').then(c => c.Tests), },
      { path: 'tests/:id', loadComponent: () => import('../tests/view/test-view').then(c => c.TestView), },
      { path: 'results', loadComponent: () => import('../results/results').then(c => c.Results), },
      { path: 'results/:id', loadComponent: () => import('../results/view/result-view').then(c => c.ResultView), },
      { path: 'questions', loadComponent: () => import('../questions/questions').then(c => c.Questions), },
      { path: 'questions/:id', loadComponent: () => import('../questions/view/question-view').then(c => c.QuestionView), },
    ]
  },
]
