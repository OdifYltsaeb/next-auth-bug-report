import Link from 'next/link';
import React from 'react';

import SEO from '../../components/atoms/SEO';
import SignUpForm from '../../components/forms/SignUpForm';

const Page = function () {
    return (
        <>
            <SEO title="Sign up" />
            <div className="px-7 py-10 w-full">
                <h1 className="text-xl">Sign up</h1>
                <hr />
                <SignUpForm next="/login" />
                <ul>
                    <li className="mt-4">
                        Already a member?&nbsp;
                        <Link href="/login" className="text-primary cursor-pointer">
                            Click here to log in.
                        </Link>
                    </li>
                    <li className="mt-4">
                        Did you forget the password?&nbsp;
                        <Link href="/forgot-password" className="text-primary cursor-pointer">
                            Click here to reset your password.
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

Page.layout = 'auth';

export default Page;
