
import HomePage from '../pages/home.f7';
import ChatPage from '../pages/chat.f7';
import NotFoundPage from '../pages/404.f7';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/chat/',
    component: ChatPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;