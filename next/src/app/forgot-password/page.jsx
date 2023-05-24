import Link from 'next/link';
import React from 'react';

import SEO from '../../components/atoms/SEO';

const Page = function () {
    return (
        <>
            <SEO title="Forgot password?" />
            <div className="px-7 py-10 w-full">
                <h1 className="text-xl">Reset your password!</h1>
                <hr />
                <p>There will be a form here at one point</p>
                <ul>
                    <li className="mt-4">
                        Remembered your password?&nbsp;
                        <Link href="/login" className="text-primary cursor-pointer">
                            Click here to log in again.
                        </Link>
                    </li>
                    <li className="mt-4">
                        Not a member?&nbsp;
                        <Link href="/register" className="text-primary cursor-pointer">
                            Click here to become one.
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

Page.layout = 'auth';

export default Page;
