import Home from "./Pages/Home.tsx";
import About from "./Pages/About.tsx";
import Projects from "./Pages/Projects.tsx";
import Articles from "./Pages/Articles.tsx";
import SingleArticle from "./Pages/SingleArticle.tsx";
import Contact from "./Pages/Contact.tsx";
import ConfirmSubscription from "./components/ConfirmSubscription.tsx";
import Login from "./Pages/Login.tsx";
import Logout from "./components/Logout.tsx";
import AdminIndex from "./Pages/Admin/index.tsx";
import ProjectIndexPage from "./Pages/Admin/Projects/index.tsx";
import CreateProject from "./Pages/Admin/Projects/create.tsx";
import EditProject from "./Pages/Admin/Projects/edit.tsx";
import ArticleIndexPage from "./Pages/Admin/Articles/index.tsx";
import CreateArticle from "./Pages/Admin/Articles/create.tsx";
import EditArticle from "./Pages/Admin/Articles/edit.tsx";
import Error404 from "./Pages/Error404.tsx";
export const Routes = [
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/about',
        element: <About/>,
    },
    {
        path: '/projects',
        element: <Projects/>,
    },
    {
        path: '/articles',
        element: <Articles/>,
    },
    {
        path: '/articles/:id',
        element: <SingleArticle/>,
    },
    {
        path: '/contact',
        element: <Contact/>,
    },
    {
        path: '/confirm-subscription',
        element: <ConfirmSubscription/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/logout',
        element: <Logout/>,
    },
    {
        path: '*',
        element: <Error404/>,
    }
]

export const AdminRoutes = [
    {
        path: '/admin',
        element: <AdminIndex/>,
    },
    {
        path: '/admin/projects',
        element: <ProjectIndexPage/>,
    },
    {
        path: '/admin/projects/new',
        element: <CreateProject/>,
    },
    {
        path: '/admin/projects/:id/edit',
        element: <EditProject/>,
    },
    {
        path: '/admin/articles',
        element: <ArticleIndexPage/>,
    },
    {
        path: '/admin/articles/new',
        element: <CreateArticle/>,
    }, 
    {
        path: '/admin/articles/:id/edit',
        element: <EditArticle/>,
    }
]

