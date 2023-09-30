import Sidebar from "components/navigation/Sidebar";
import { Dialog, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    CheckIcon
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router-dom";
import { check_authenticated, load_user, logout, refresh } from "redux/actions/auth/auth";
import foto_p from "assets/img/foto_p.png"

function Layout({
    refresh,
    isAuthenticated,
    check_authenticated,
    user_loading,
    children,
    load_user,
    user,
    logout,
}) {
    useEffect(() => {
        refresh();
        check_authenticated();
        load_user();
    },[])
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    if (!isAuthenticated){
        navigate('/')
    }
    
    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" 
                        className="relative z-40 md:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex min-h-0 flex-1 flex-col  shadow-card  bg-white">
                                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                                            <div className="flex flex-shrink-0 items-center px-4">
                                                <Link to="/ordenes/crear/" className="ml-4 mt-2">
                                                    <img
                                                        src={foto_p}
                                                        width={240}
                                                        height={160}
                                                        className=""
                                                    />
                                                </Link>
                                            </div>
                                            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                                                <Sidebar />
                                            </nav>
                                        </div>
                                        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                            <div className="group block w-full flex-shrink-0">
                                                <div className="flex items-center">
                                                    <div>
                                                        <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                                                            <svg
                                                                className="h-full w-full text-gray-300"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="ml-3 text-center">
                                                        <button className="text-sm font-medium text-gray-500 hover:text-cyan-500">
                                                            {user && user.nombres} {user && user.apellidos}
                                                        </button>
                                                        <button
                                                            onClick={()=>handleLogout()}
                                                            className="text-xs font-medium text-gray-500 hover:text-cyan-500"
                                                        >
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                {/* Static sidebar for desktop */}
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex min-h-0 flex-1 flex-col  shadow-card  bg-white">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            <div className="flex flex-shrink-0 items-center px-4">
                                <Link to="/ordenes/crear/" className="ml-4 mt-2">
                                    <img
                                        src={
                                            foto_p
                                        }
                                        width={240}
                                        height={160}
                                        className=""
                                    />
                                </Link>
                            </div>
                            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                                <Sidebar />
                            </nav>
                        </div>
                        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                            <div className="group block w-full flex-shrink-0">
                                <div className="flex items-center">
                                    <div>
                                        <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                                            <svg
                                                className="h-full w-full text-gray-300"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="ml-3 text-center">
                                        <Link to='../user/view'className="text-sm font-medium text-gray-500 hover:text-amber-500">
                                            {user && user.nombres} {user && user.apellidos}
                                        </Link>
                                        <button
                                            onClick={(e) => setOpen(true)}
                                            className="text-xs font-medium text-gray-500 hover:text-amber-500"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:pl-64">
                    <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                {children}
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full item-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-8 text-gray-900">Cerrar sesion</Dialog.Title>
                                        <p>¿Esta seguro de cerrar la sesion?</p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center py-2 px-4 rounded-md border border-transparent font-medium  bg-amber-500 text-black hover:bg-black hover:text-amber-500 sm:text-sm" 
                                        onClick={()=>handleLogout()}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            
        </>
    );
    

}
const mapStateToProps = (state) => ({
    user_loading: state.auth.user_loading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});
export default connect(mapStateToProps, {
    check_authenticated,
    load_user,
    logout,
    refresh,
})(Layout);
