import {Home, Setup} from './pages/Home';
import Doc, { Core1, Core2, Core3,Core4,Core5,Core6} from './pages/Doc';
import Login1 from './pages/Login1';
const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/doc',
        component: Doc,
        pri: true,
        routes: [
            {
                path: '/doc/core1',
                component: Core1,
            },
            {
                path: '/doc/core2',
                component: Core2,
            },
            {
                path: '/doc/core3',
                component: Core3,
            },
            {
                path: '/doc/core4',
                component: Core4,
            },
            {
                path: '/doc/core5',
                component: Core5,
            },
            {
                path: '/doc/core6',
                component: Core6,
            },
        ]
    },
    {
        path: '/setup',
        component: Setup,
        pri: true
    },
    {
        path: '/login',
        component: Login1
    },
]
export default routes;