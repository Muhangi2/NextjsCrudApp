"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setproviders] = useState(null);
  const [toggle, settoggle] = useState(true);
  const { data: session } = useSession;
  console.log(session?.user);

  useEffect(() => {
    const setpuproviders = async () => {
      const response = await getProviders();
      setproviders(response);
    };
    setpuproviders();
  }, []);
  return (
    <nav className="flex-between bg-red-800 w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">The Ai models</p>
      </Link>
      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} type="button" className="outline_btn">
              SignOut
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                src="/assets/images/logo.svg"
                width={30}
                height={30}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider?.id)}>
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex-relative">
        {session?.user ? (
          <div className="flex">
            <Image
              alt="profile"
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              className="rounded-full"
              onClick={() => {
                settoggle((prev) => !prev);
              }}
            />
            {toggle && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggle(false)}>
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggle(false)}>
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggle(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider?.id)}>
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
