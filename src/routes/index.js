import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
// Public routes
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Explore from '~/pages/Explore';
import Friend from '~/pages/Friend';
import Message from '~/pages/Message';
import Content from '~/pages/Content';
import Comment from '~/pages/Comment';
import Analytics from '~/pages/Analytics';
import Inspirations from '~/pages/Inspirations';
import Sounds from '~/pages/Sounds';
import Feedback from '~/pages/Feedback';
import HomeUpload from '~/pages/HomeUpload';
const privateRouter = [
    { path: config.routes.upload, component: Upload },
    { path: config.routes.homeUpload, component: HomeUpload },
    { path: config.routes.post, component: Content },
    { path: config.routes.comment, component: Comment },
    { path: config.routes.analytics, component: Analytics },
    { path: config.routes.inspirations, component: Inspirations },
    { path: config.routes.unlimitedsounds, component: Sounds },
    { path: config.routes.feedback, component: Feedback },
];
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.messages, component: Message },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.friend, component: Friend },
    { path: config.routes.live, component: Live },
    ...privateRouter.map(route => ({ ...route, layout: 'upload' })),
];

export { publicRoutes, privateRouter };
