import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { login,refresh, check_authenticated,load_user, reset_password } from "../../redux/actions/auth/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import foto_p from "assets/img/foto_p.png"
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(
    mapStateToProps,
    {
        reset_password,
        refresh,
        check_authenticated,
        load_user,
    }
)(function ResetPassword({
    reset_password,
    isAuthenticated,
    loading,
    refresh,
    check_authenticated,
    load_user,
}) {
    useEffect(() => {
        isAuthenticated ? <></>:
        <>
            {refresh()}
            {check_authenticated()}
            {load_user()}
        </>
    }, []);

    const [formData, setFormData] = useState({
        email: ''
    });
    const { 
        email
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email)
        navigate('/')
    }
    if (isAuthenticated) {
        return <Navigate to='/dashboard'/>
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-auto w-auto"
                        src={foto_p}
                        alt="Your Company"
                    />
                </div>
                <form onSubmit={e=>{onSubmit(e)}} className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                value={email}
                                onChange={e=>onChange(e)}
                                type="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <span className="">Already have an account?</span>
                            <Link 
                                to="/"
                                className="font-medium text-amber-500 hover:text-gray-700"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <EnvelopeIcon
                                    className="h-5 w-5 text-amber-600 group-hover:text-amber-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Send Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});
