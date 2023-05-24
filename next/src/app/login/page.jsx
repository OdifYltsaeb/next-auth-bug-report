'use client';

import Link from 'next/link';
import React from 'react';

import { useSearchParams } from 'next/navigation';
import SEO from '../../components/atoms/SEO';
import LoginForm from '../../components/forms/LoginForm';

const Page = function ({ setUserData }) {
    const searchParams = useSearchParams();

    return (
        <>
            <SEO title="Log in" />
            <div className="px-7 py-10 w-full">
                <h1 className="text-xl">Welcome back!</h1>
                <hr />
                <LoginForm next={searchParams.toString()} setUserData={setUserData} />
                <ul>
                    <li className="mt-4">
                        Not a member?&nbsp;
                        <Link href="/register" className="text-primary cursor-pointer">
                            Click here to become one.
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

export default Page;
